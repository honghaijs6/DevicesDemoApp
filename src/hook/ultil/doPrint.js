


const doPrint = (HTML)=>{

    const printWindow = document.createElement("iframe");
    printWindow.style.position = "absolute";
    printWindow.style.top = "-1000px";
    printWindow.style.left = "-1000px";
    printWindow.id = "printWindow";
    
    if (document.getElementById("printWindow")) {
        document.body.removeChild(document.getElementById("printWindow"));
    }
    document.body.appendChild(printWindow);

    
    var pri = document.querySelector('#printWindow').contentWindow; 
    pri.document.open();
    pri.document.write(HTML);
    pri.document.close();
    pri.focus();
    pri.print(); 

    

}

export default doPrint;