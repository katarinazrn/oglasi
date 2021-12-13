import { useState } from 'react';
import SquareImage from '../UI/SquareImage';

const Register = props => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [PIB, setPIB] = useState('')
    const [address, setAddress] = useState('')
    const [website, setWebsite] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleSubmit = e => {
        e.preventDefault();

        let formData = new FormData();

        if (email.trim() === '') return;
        if (name.trim() === '') return;
        if (password.trim() === '') return;
        if (description.trim() === '') return;
        if (PIB.trim() === '') return;

        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('description', description);
        formData.append('PIB', PIB);

        if (imageUrl.trim() !== '')
            formData.append('imageUrl', imageUrl);
        else formData.append('imageUrl', null);

        if (address.trim() !== '')
            formData.append('address', address);
        else formData.append('address', null);

        if (website.trim() !== '')
            formData.append('website', website);
        else formData.append('website', null);

        if (phone.trim() !== '')
            formData.append('phone', phone);
        else formData.append('phone', null);

        formData.append('file', file);

        fetch('https://localhost:44318/api/employers/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    const handleFileInput = e => {
        setFile(e.target.files[0]);
        setImageUrl(e.target.files[0].name)
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <form className='bg-success text-light my-5 p-3 rounded' onSubmit={handleSubmit}>
            <h1 className='text-light text-center'>Register</h1>
            <div className='form-group'>
                <label>Name</label>
                <input className="form-control" type='text' onChange={e => setName(e.target.value)} value={name} />
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input className="form-control" type='text' onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input className="form-control" type='password' onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <div className='form-group'>
                <label>Description</label>
                <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description} />
            </div>
            <div className='form-group'>
                <label>PIB</label>
                <input className="form-control" type='text' onChange={e => setPIB(e.target.value)} value={PIB} />
            </div>
            <div className='form-group'>
                <label>Address</label>
                <input className="form-control" type='text' onChange={e => setAddress(e.target.value)} value={address} />
            </div>
            <div className='form-group'>
                <label>Website</label>
                <input className="form-control" type='text' onChange={e => setWebsite(e.target.value)} value={website} />
            </div>
            <div className='form-group'>
                <label>Phone number</label>
                <input className="form-control" type='text' onChange={e => setPhone(e.target.value)} value={phone} />
            </div>
            <div className='form-group'>
                <label>Profile image</label>
                <input className="form-control" type='file' onChange={handleFileInput} />
                {preview &&
                    <div className='d-flex mt-2 justify-content-center'>
                        <SquareImage src={preview} width='150px' />
                    </div>}
            </div>
            <div className='d-flex justify-content-center m-3'>
                <input className='btn btn-light px-3' type='submit' value='Register' />
            </div>
        </form>
    )
}

export default Register;