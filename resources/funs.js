let i = 0;
    let xml = null;

        document.addEventListener('DOMContentLoaded', ()=>{
        //fetch the data as soon as the page has loaded
        fetch('resources/emps.xml')
        .then(response=>response.text())
        .then(data=>{
            //console.log(data);  //string
            let parser = new DOMParser();
            xml = parser.parseFromString(data, "application/xml");
            console.log(xml)
            printData();
            
        });
    })

    function nextb(){
        if(i<xml.getElementsByTagName("name").length-1){
            i++;
            printData();
        }
    }

    function prevb(){
        if(i>0){
            i--;
            printData();
        }
    }

    function searchbyName(){
        nameToSearch = nameID.value;
        for(let j=0 ; j<xml.getElementsByTagName("name").length;j++){
            if(nameToSearch == xml.getElementsByTagName("name")[j].firstChild.nodeValue){
                i = j;
                break;
            }else{
                continue;
            }
        }
        printData();
    }

    function insertData(){
        var employee = xml.createElement("employee");
        var name = xml.createElement("name");
        name.appendChild(xml.createTextNode(nameID.value));
        var phone = xml.createElement("phone");
        phone.appendChild(xml.createTextNode(phoneID.value));
        var address = xml.createElement("address");
        address.appendChild(xml.createTextNode(addressID.value));
        var email = xml.createElement("email");
        email.appendChild(xml.createTextNode(emailID.value));
        employee.appendChild(name);
        employee.appendChild(phone);
        employee.appendChild(address);
        employee.appendChild(email);
        xml.getElementsByTagName("emps")[0].appendChild(employee);
        console.log(xml)

        //var data = new Blob([xml], {type: 'text/plain'});
        /*const fs = require('fs')

        // Data which will write in a file.
        let data = "Learning how to write in a file."
        
        // Write data in 'Output.txt' .
        fs.writeFile('Output.txt', data, (err) => {
            
            // In case of a error throw err.
            if (err) throw err;
        })*/
    }

    function updateData(){
        x = xml.getElementsByTagName("employee")[i];
        x.parentNode.removeChild(x);
        insertData();
    }

    function deleteData(){
        x = xml.getElementsByTagName("employee")[i];
        x.parentNode.removeChild(x);
        printData();
        console.log(xml);
    }

    function printData(){
        nameID.value = xml.getElementsByTagName("name")[i].firstChild.nodeValue;
        phoneID.value = xml.getElementsByTagName("phone")[i].firstChild.nodeValue;
        addressID.value = xml.getElementsByTagName("address")[i].firstChild.nodeValue;
        emailID.value = xml.getElementsByTagName("email")[i].firstChild.nodeValue;
    }
