import { Form, useLoaderData,redirect} from "react-router-dom";
import Contact from "./contact";
import { updateContact } from "../contacts";
export async function action({request,params}) {
    const formdata=await request.formData();
    
    const updates = Object.fromEntries(formdata);
    await updateContact(params.contactId, updates);
    //console.log(request,formdata,updates);
    return redirect(`/contacts/${params.contactId}`);
    
}
export default function EditContact(){
    const {contact}=useLoaderData();
    return(
        <Form method="post" id="contact-form">
            <p>
            <span>Name</span>
            <input type="text" name="first" aria-label="First Name" defaultValue={contact?.first} placeholder="first"/>
            <input type="text" name="last" aria-label="Last Name" defaultValue={contact?.last}  placeholder="Last"/>
            </p>
            <label htmlFor="">
                <span>Twitter</span>
                <input type="text" name="twitter" placeholder="@jack" defaultValue={contact?.twitter} />
            </label>
            <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
        </Form>
    )
}