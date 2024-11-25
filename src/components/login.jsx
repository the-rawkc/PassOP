import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const Manager = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const ref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let req = fetch("http://localhost:3001")
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text).then(() => {
            // Success
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    const showPassword = () => {
        setPasswordVisible(!passwordVisible);
        if (ref.current.src.includes("/open-eye.jpg")) {
            ref.current.src = "/close-eye.jpg";
        } else {
            ref.current.src = "/open-eye.jpg";
        }
    };

    const savePassword = () => {
        if (form.site.length >3 && form.username.length >3 && form.password.length >3) {
            const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray)); // Use newPasswordArray here
            setForm({ site: "", username: "", password: "" }); // Reset form after saving
        } else {
            alert("All fields are required!");
        }
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

   const deletePassword = (id) => {
    let c=confirm("Do you really want to delete this password?")
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }

   const editPassword = (id) => {
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    
    }



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

<div className="fixed top-0 z-[-2] min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] bg-fixed"></div>

            <div className="md:mycontainer text-white">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">/&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </h1>
                <p className="text-green-800 text-lg text-center">Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className="rounded-full border border-green-950 w-full p-4 py-1" type="text" name="site" id="" />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-950 w-full p-4 py-1" type="text" name="username" id="" />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-950 w-full p-4 py-1" type={passwordVisible ? "text" : "password"} name="password" id="" />
                            <span className="absolute right-2 top-0 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={35} src="/open-eye.jpg" alt="Toggle visibility" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className="flex justify-center items-center bg-green-600 rounded-full w-fit px-8 py-2 hover:bg-green-500 gap-2 border border-green-950">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 px-3'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='px-3'>No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className='table-auto w-full rounded-md overflow-hidden pb-2'>
                            <thead className='bg-green-700 text-white'>
                                <tr>
                                    <th className='py-2'>Website</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50 text-black'>
                                {passwordArray.map((item, index) =>
                                    <tr key={index}>
                                        <td className='text-center py-2 border border-black '>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                <div className='size-6 px-2 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-black '>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='size-6 px-2 cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-black '>
                                            <div className='flex items-center justify-center'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='size-6 px-2 cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-black'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/swcqkzdc.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;
