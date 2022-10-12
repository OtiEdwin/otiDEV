let test = document.getElementById('test'),
    text = test.innerText,
    text1 = `Hello World`, 
    text2 = `My name is Otonye Edwin`,
    text3 = `I'm a full-stack Web Developer`,
    text4 = `Welcome to my Desktop`,        
    text5 = `Check out all my Projects`

let textArr = [ text1, text2, text3, text4, text5 ],
    i = 0, 
    j = -1
    
function changeText(){
    const interval_id = setInterval(() => {
        let text_1 = textArr[ j % textArr.length ],
            text_2 = textArr[ (j+1) % textArr.length ],
            total_length = text_1.length + text_2.length;

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
setInterval( changeText, 9000 );

// TO CHANGE THE PATH DISPLAY

function Path( trace, coordinates, location ) {
    let i = 0
    function pathTracer ( a, b ){
        let base = a;
        if( i < b.length ){
            let div = document.createElement('div')
            div.className = "path-box"
            // div.onClick = "contentChange('location[base][ b[i] ]', d0, [])"
            let inner = document.createTextNode( `${location[base][ b[i] ]} ||`)
            div.appendChild(inner)
            path.appendChild(div)

            let new_base = `${base}${ b[i] }`
            i++
            pathTracer( new_base, b )        
        }
    }
    pathTracer( trace, coordinates )    
}

// TO CHANGE THE WiNDOW CONTENT DiSPLAY

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


function windowHandler( window_init, action, display_state ) {
    let window = document.getElementById(window_init),
        path = document.getElementById('path'),
        expanded = document.getElementsByClassName("expanded")

    if (display_state == false){
        window.classList.add('none') = ''
        path.innerHTML = ''
    }
    else{
        window.classList.remove('none')
        if (action == 'expand'){
            expanded[0].innerHTML = ` &boxbox; `
            expanded[1].innerHTML = ` &boxbox; `
            window.classList.add('full')
            
        }
        if (action == 'shrink'){
            expanded[0].innerHTML = ` &EmptySmallSquare; `
            expanded[1].innerHTML = ` &EmptySmallSquare; `
            if ( window_init === 'file'){
                window.classList.remove('full')                
            }
            else{
                window.style.width = '80%'
                window.style.height = '80%'   
            }
        }
    }
}

let dark_mode = true // default color mode - the default is dark mode

function changeColorMode() {
    dark_mode = !dark_mode // reverse the boolean

    let about_image = document.getElementById('image'),
        head_text = document.getElementsByClassName('heading')[0],
        // An array of objects that describes CSS :root variables
        array = [
            {
                name:'--b-w', // :root varable
                dark:'#89d4ff', // dark mode value
                light: 'white' // light mode value
            }, 
            {
                name:' --wndow-panel',
                dark:'white',
                light: 'black'
            },
            {
                name:'--wndow-panel-bg',
                dark:'#111111',
                light: '#e9e9e9'
            },
            {
                name:'--web-jpeg-bg',
                dark:'#1c1c1c',
                light: '#28719b'
            },
            {
                name:'--box-bg',
                dark:'#373435',
                light: '#f1f1f1'
            },
            {
                name:'--box-bs',
                dark:'black',
                light: '#89d4ff'
            },
            {
                name:'--wndows-bg',
                dark:'#1c1c1c',
                light: 'white'
            },
            {
                name:'--h3_p',
                dark:'#89d4ff',
                light: '#28729c'
            },
            {
                name:'--body',
                dark:'white',
                light:'#00629a'
            },
            {
                name:'--border',
                dark:'transparent',
                light:'#0000ff5e'
            }
            
        ]
        
        
    for (let j = 0; j < array.length; j++) {
        // indexing through all members of the array, change all default values accordng to boolean value of 'dark_mode' 
        document.documentElement.style
        .setProperty( array[j].name, dark_mode? array[j].dark : array[j].light )        
    }


    // set head text
    head_text.style = dark_mode? '' : 'color : #01a0e2' 

    // set body color
    document.body.style = dark_mode?
    ' background-color: black; background-image: url(./assets/left.png) ' 
    : 
    ' background-color: #0a4f77; background-image: url(./assets/left1.png) '

    // set about jpeg
    about_image.src = dark_mode? './assets/about-d.png' : './assets/about.png'
}
document.getElementById('toggle').addEventListener('click', changeColorMode) // add function to toggle

dragWindow(document.getElementById('about'))
dragWindow(document.getElementById('file'))

function dragWindow(element) {
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    if (document.getElementById(element + 'header')){
        document.getElementById(element + 'header').onmousedown = dragMouseDown
    }
    else {
        element.onmousedown = dragMouseDown
    }

    function dragMouseDown(elem) {
        elem = elem || window.event
        elem.preventDefault()

        pos3 = elem.clientX
        pos4 = elem.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(elem) {
        elem = elem || window.event
        elem.preventDefault()
        
        pos1 = pos3 - elem.clientX
        pos2 = pos4 - elem.clientY
        pos3 = elem.clientX
        pos4 = elem.clientY

        element.style.top = (element.offsetTop -pos2) + 'px'
        element.style.left = (element.offsetLeft -pos1) + 'px'
    }
    function closeDragElement() {
        // stop move mouse
        document.onmouseup = null        
        document.onmousemove = null        
    }
}
