let test = document.getElementById('test'),
    text = test.innerText,
    text1 = `Hello World`, 
    text2 = `My name is Otonye Edwin`,
    text3 = `I'm a full-stack Web Developer`,
    text4 = `Welcome to my Desktop`,        
    text5 = `Check out all my Projects`

let textArr = [ text1, text2, text3, text4, text5 ],
    i = 0, 
    j = 0

function changeText(){
    const interval_id = setInterval(() => {
        let text_1 = textArr[ j % textArr.length ],
            text_2 = textArr[ (j+1) % textArr.length ],
            total_length = text_1.length + text_2.length;
            console.log('total length is:', total_length)

        if (i < total_length){
            if (i < text_1.length) {
                test.innerText = text_1.slice(0, -(i+1))
            }
            else{
                test.innerText += text_2[i - text_1.length]
            }
            i++          
        }
        else{ clearInterval(interval_id) }
    }, 70)
    if(document.hidden){clearInterval(interval_id); j--}
    i = 0; j++
}
setInterval( changeText, 8000 );







function contentChange( content, depthTrace, coordinates ){
    let a = document.getElementById('categories'),
        b = document.getElementById('web-apps'),
        c = document.getElementById('mobile-apps'),
        d = document.getElementById('all'),
        e = document.getElementById('projects')

    let path = document.getElementById('path')

    let file_location = {
        'd0' : ['Categories', 'All'],
        'd00' : ['Web Apps', 'Mobile Apps', 'All'],
        'd01' : ['Spry', 'CBYM', 'ReferMe'],
        'd000' : ['Spry', 'CBYM'],
        'd001' : ['ReferMe'],
    }

    let arr = [ a, b, c, d, e ]
    path.innerHTML = ''

    for( i=0; i<arr.length; i++ ){
        if (content===arr[i].id){
            arr[i].style = 'display: flex;'
            Path( depthTrace, coordinates, file_location)
        }
        else{
            arr[i].style = 'display: none;'
        }
    }
}

function Path( trace, coordinates, location ) {
    let i = 0
    function pathTracer ( a, b ){
        let base = a;
        if( i < b.length ){
            let div = document.createElement('div')
            div.className = "path-box"
            let inner = document.createTextNode( `${location[base][ b[i] ]}||`)
            div.appendChild(inner)
            path.appendChild(div)

            let new_base = `${base}${ b[i] }`
            i++
            pathTracer( new_base, b )        
        }
    }
    pathTracer( trace, coordinates )    
}

function windowHandler( window_init, action, display_state ) {
    let window = document.getElementById(window_init),
        path = document.getElementById('path')

    if (display_state == false){
        window.style = 'display : none'
        path.innerHTML = ''
    }
    else{
        window.style = 'display : initial'
        if (action == 'expand'){
            window.style.width = '100%'
            window.style.height = '100%'
        }
        if (action == 'shrink'){
            if ( window_init === 'file'){
                window.style.width = '50rem'
                window.style.height = '40rem'                
            }
            else{
                window.style.width = '80%'
                window.style.height = '80%'   
            }
        }
    }
}


// function closure(){
//     let count = 0;
//     return ()=>console.log(count++);
// }

// setInterval(closure(), 500);