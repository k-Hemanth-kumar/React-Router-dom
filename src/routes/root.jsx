import { Link, Outlet, useLoaderData,redirect, NavLink } from "react-router-dom";
import { getContacts,createContact } from "../contacts";
import { Form } from "react-router-dom";
export  async function loader({params}){
    const contacts=await getContacts(params.conatactId);
    return {contacts}
}
export async function action() {
    const contact=await createContact();
    console.log(contact,10)
    return redirect(`/contacts/${contact.id}/edit`);
    //return {contact};
}
export default function Root(){
    const {contacts} =useLoaderData();
    return(
        <>
        <div className="sidebar" id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
                <form id="search-form" role="search">
                    <input type="search" name="q" placeholder="Search" id="q" aria-label="Search contacts" />
                    <div className="search-spinner" aria-hidden hidden={true}></div>
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <Form method="post">
            <button type="submit">New</button>
          </Form>
            </div>
            <nav>
                {contacts.length?(
                    <ul>
                        {contacts.map((contact)=>{
                            //console.log(contact,33)
                           return <li key={contact.id}>
                                <NavLink to={`contacts/${contact.id}`} className={
                                    ({isActive,isPending})=>isActive?"active":isPending?"pending":""
                                }>
                                 {(contact.first || contact.last)?(
                                    <> 
                                    {contact.first} {contact.last}
                                    </>
                                 ):(
                                    <i>No Name</i>
                                 )} { " "}
                                 {contact.favorite && <span>★</span>}
                                </NavLink>
                            </li>
                        })}
                    </ul>
                ):(
                    <p>No Contacts</p>
                )}
            </nav>
        </div>
        <div className="detail" id="detail">
            <Outlet/>
        </div>
        </>
        
    )
}