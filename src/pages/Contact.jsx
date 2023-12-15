import { Suspense, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import {Fox} from '../models/Fox'
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {

  const formRef = useRef(null);
  const [isLoading, setisLoading] = useState(false)
  const [form, setForm] = useState({name: '', email: '', message: ''});
  const [currentAnimation, setcurrentAnimation] = useState("idel")
 
  const {alert, showAlert, hideAlert} = useAlert();

  const  handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    setcurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
     
      {
        from_name: form.name,
        to_name: 'Mohamed',
        from_email: form.email,
        to_email: 'mohamedfoad155555@yahoo.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KAY
      

    ).then(() => {
        setisLoading(false);
        showAlert({show: true, text: 'Message sent successfully!', type: 'success'});

        setTimeout(() => {
         hideAlert();
         setcurrentAnimation('idel')
         setForm({name: '', email: '', message: ''});
        }, [4000])
    }
    ).catch((error) => {
        setisLoading(false);
        setcurrentAnimation('idel');
        console.log(error);
        // setForm({name: '', email: '', message: ''});
        showAlert({show: true, text: 'i didnt receive your message', type: 'danger'});
    })
  }
  const handleFoucs = () => setcurrentAnimation("walk");
  const handleBulr = () => setcurrentAnimation('idel');


  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">

      {alert.show && <Alert {...alert} />}
      
      

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text"> Get in Touch</h1>
        <form className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        
        >
          <label className="text-black-500 font-semibold">
            Name
            <input 
              type="text" 
              name="name"
              className="input"
              placeholder="Jone"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFoucs}
              onBlur={handleBulr}
            />
          </label>
          
          <label className="text-black-500 font-semibold">
            Email
            <input 
              type="email" 
              name="email"
              className="input"
              placeholder="Jone@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFoucs}
              onBlur={handleBulr}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Your Message
            <textarea 
              rows={4}
              name="message"
              className="textarea"
              placeholder="Let me how i can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFoucs}
              onBlur={handleBulr}
            />
          </label>

          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFoucs}
            onBlur={handleBulr}
          >
                {isLoading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov:75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
              <Fox
              currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
