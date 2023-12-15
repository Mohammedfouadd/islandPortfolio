import {useEffect, useRef} from 'react'
import palnScene from '../assets/3d/plane.glb'
import {useAnimations , useGLTF } from '@react-three/drei'

const Plane = ({isRotating, ...props}) => {
    const ref = useRef();
    let {scene, animations} = useGLTF(palnScene);
    const {actions} = useAnimations(animations, ref)
    
    useEffect(() => {
        if(isRotating){
            actions['Take 001'].play();
        }else {
            actions['Take 001'].stop();
        }

    }, [actions, isRotating])
    return (
        <mesh {...props} ref={ref}>
          <primitive object={scene} />
          
        </mesh>
      )
}

export default Plane
