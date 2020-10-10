
import doFindAll from '../hook/ultil/doFindAll' ; 

import React, { Component } from 'react';
import { Input, ButtonGroup, Button } from 'reactstrap';



export default class InputSuggest extends Component{

    
    constructor(props){
        super(props);

        
        this.state = {
            display:'none',
            value:props.defaultValue || '',
            rows:[],
            selectedIndex:null,
            strModel:props.strModel || 'suppliers',
            code:props.code || 'code'
        }

        this._keyHandling = this._keyHandling.bind(this); 
    }
    async _onChange(key){

        const resSup = await doFindAll(this.state.strModel,key);
        this.setState({
            display:'block',
            value:key,
            time:0,
            selectedIndex:0,
            rows: resSup.name === 'success' ? resSup.rows : [] 
        }); 

        
    }
    
    

    _keyHandling(e){
        
        let index = this.state.selectedIndex === null ? 0 : this.state.selectedIndex ; 
        if(this.state.rows.length>0){
            switch(e.keyCode){
                case 40: // arrow down
                    
                    
                    index = index >= 5 ? 0 : index + 1 ; 
                    index = this.state.rows.length === 1 ? 0 : index; 
                    this.setState({
                        selectedIndex:index,
                        value:this.state.rows[index][this.state.code]
                    });
                    
    
                break ;
                case 38: // arrow up
                    index = index <= 0 ? 5 : index - 1 ; 
                    index = this.state.rows.length === 1 ? 0 : index; 
                    
                    this.setState({
                        selectedIndex:index,
                        value:this.state.rows[index][this.state.code]
                    });
    
                break ;
                
                case 13:
                    index = this.state.rows.length === 1 ? 0 : index; 
                    this._onSelected(this.state.rows[index]);
                break ;
                
            }
        }
       

    }

    /*componentWillUnmount(){
        
        window.removeEventListener("keyup",this._keyHandling);
        //document.querySelector("*").removeEventListener("click",()=>{});


    }

    componentDidMount(){

        window.addEventListener("keyup",this._keyHandling.bind(this));

        document.querySelector("*").addEventListener("click",()=>{
            this.setState({display:'none'});
        });

    }*/

    _onSelected(item){
        
        this.setState({
            display:'none',
            value:item[this.state.code]
        });

        if(this.props.onSelected !== undefined){
            this.props.onSelected(item);
        }
        
    }


    render(){ 
  
        return(
            <div>
                <ButtonGroup style={{width:'100%'}}>
                    <Input 
                        onKeyUp={ this._keyHandling } 
                        id={this.props.id || 0 } 
                        placeholder="Tìm kiếm..." 
                        style={{
                            borderRight:0,
                            borderTopRightRadius:0,
                            borderBottomRightRadius:0,
                            width:'100%'
                        }}
                        value={this.state.value} 
                        onChange={(e)=>{ this._onChange(e.target.value) }}  
                            
                        type="text" />

                    <Button disabled style={{
                        background:'#fff',
                        color:'#999',
                        
                    }}> <i className="fa fa-search"></i> </Button>

                </ButtonGroup>
                
                

                    
                <ul className="suggest-holder" style={{display:this.state.display}} >
                    {
                        this.state.rows.map((item,index)=>{

                            const markSlected = index === this.state.selectedIndex ? 'active' : '' ; 
                            return( 
                                <li className={markSlected} onClick={ ()=>{ this._onSelected(item) } } key={item.id}> { item.name } </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        )
    }
}