import { Link, Outlet, useLoaderData,redirect, NavLink, useNavigation, useSearchParams, useSubmit } from "react-router-dom";
import { getContacts,createContact } from "../contacts";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
export  async function loader({params,request}){
    console.log(request);
    const url=new URL(request.url)
    const q=url.searchParams.get('q') || "";
    var contacts;
    if(q){
         contacts=await getContacts(q);
    }
    else{

    
     contacts=await getContacts(params.conatactId);
    }
    return {contacts,q}
}
export async function action() {
    const contact=await createContact();
    console.log(contact,10)
    return redirect(`/contacts/${contact.id}/edit`);
    //return {contact};
}
export default function Root(){
    const {contacts,q} =useLoaderData();
    const navigation=useNavigation();
    const [query,setQuery]=useState(q);
    const submit=useSubmit();
    const searching=navigation.location && new URLSearchParams(navigation.location.search).has('q')
    useEffect(()=>{
        setQuery(q)
    },[q])
    return(
        <>
        <div className="sidebar" id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
                <Form id="search-form" role="search">
                    <input type="search" name="q" placeholder="Search" id="q" aria-label="Search contacts" 
                    defaultValue={q} 
                    value={query} 
                    className={searching?"loading":""}
                    //onChange={(e)=>{setQuery(e.target.value)}}
                    onChange={(e)=>{
                        const isFirstSearch=q==null;
                        submit(e.currentTarget.form,{
                            replace:!isFirstSearch
                        })
                    }}
                    />
                    <div className="search-spinner" aria-hidden hidden={!searching}></div>
                    <div className="sr-only" aria-live="polite"></div>
                </Form>
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
        <div id="detail" className={navigation.state==="loading"?'loading':""}>
            <Outlet/>
        </div>
        </>
        
    )
}