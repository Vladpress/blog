import { Formik } from 'formik';
import * as styles from '../styles/styled/post';
import Link from 'next/link'

const { Button } = styles; 

export default function CreatePost() {
    const handleSubmit = async ({ title, body }) => {
        event.preventDefault();
        const post = {title, body};
        const response = await fetch('https://simple-blog-api.crew.red/posts', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
    }

    return (
        <>
            <h1>New post</h1>
            <Formik
                initialValues={{ body: "", title: ""}}
                onSubmit={ handleSubmit }
            >
                {props => { 
                    console.log(props);
                    return (
                    <form onSubmit={props.handleSubmit} className="form-modal" noValidate autoComplete="off">
                        <input value={props.values.title} name="title" onChange={props.handleChange} placeholder="title" />
                        <input value={props.values.body} name="body" onChange={props.handleChange} placeholder="body" />
                        <div className="buttons-wrapper">
                        <Link href={'/'}><Button>Back</Button></Link> 
                        <Button>Ok</Button>
                        </div>
                    </form>
                )}}
            </Formik>
        </>
    )
}