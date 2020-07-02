import React from 'react'
import Particles from 'react-particles-js'
import './rain.css'

const Rain = () => {
    return (
        <Particles className = "rain"
            params={{
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": false
                        }
                    },
                    "opacity" : {
                        "value" : 1,
                        "random" : false
                    },
                    "shape" :{
                      "type":"triangle"
                    },
                    // "image" : {
                    //     "src" : "https://cdn.pixabay.com/photo/2014/03/24/17/21/drop-295494_960_720.png",
                    //     "width" : 100,
                    //     "height" : 20
                    // },
                    "color" : {
                        "value" : "#0059b3"
                    },                    
                    "size": {
                        "value": 10,
                        "random": true
                    },
                    "move": {   
                        "direction": "bottom",
                        "speed" : 60,
                        "out_mode": "out"
                    },
                    "line_linked": {
                        "enable": false
                    }
                }
            }} />
    )
}


export default Rain