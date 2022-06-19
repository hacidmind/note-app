import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const EditNote = ({note}) => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: note.title,
            description: note.description
        }
    });

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const noteId = router.query.id;

            const res = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            router.push("/")
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <div className="container">
                <h1>Update Note</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Title" className='form-control' {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}
                    <textarea name="Description" cols="30" rows="10" className="form-control my-3" placeholder="Description" {...register("description", { required: true })}></textarea>
                    {errors.description && <span>This field is required</span>}
                    <div className="d-grid gap-2">
                        <button className="btn btn-outline-success" type='submit'>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const { data } = await res.json();

    return { note: data }
}

export default EditNote;
