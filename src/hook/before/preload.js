export default function(loading){
    
    const preload = document.querySelector('.preloader-it');
    const preloadText = document.querySelector('.preload-text');

    switch(loading){

        case 'get':
            preload.style.display = 'block';
            preloadText.innerHTML = 'process Loading...';

        break ;
        case 'authenticate':
            
            preload.style.display = 'block';
            preloadText.innerHTML = 'process authentication...';
        break;
        case 'loading':
            
            preload.style.display = 'block';
            preloadText.innerHTML = 'Loading...';

        break;

        case 'stop':
        preload.style.display = 'none';
        break;

        case 'post':
            preload.style.display = 'block';
            preloadText.innerHTML = 'in progress...';
        break ;

        case 'put':
            preload.style.display = 'block';
            preloadText.innerHTML = 'in progress...';
        break ;

        case 'patch':
            preload.style.display = 'block';
            preloadText.innerHTML = 'in progress...';
        break ;

        case 'delete':
            preload.style.display = 'block';
            preloadText.innerHTML = 'in progress...';
        break ;

        case 'photo':
            preload.style.display = 'block';
            preloadText.innerHTML = 'upload photo...';
        break ;
        
        
        
        
    }    
    

}