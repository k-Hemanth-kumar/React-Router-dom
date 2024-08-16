import { Form } from "react-router-dom"
export default function Contact(){
    const contact={
        first:"Your",
        last:"Name",
        avatar:"https://robohash.org/you.png?size=200x200",
        notes:"Some notes",
        favorite:true,
        twitter:"Your_handle",
    }
    return(
        <div id="contact">
            <div>
                <img key={contact.avatar} src={contact.avatar || `https://robohash.org/${contact.id}.png?size=200x200`} alt="contact" />
            </div>
            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>{contact.first} {contact.last}
                        </>
                    ):(
                        <i>No Name</i>
                    )} {" "}
                    <Favorite contact={contact}/>
                </h1>
                {contact.twitter &&(
                    <p>
                        <a href={`https://twitter.com/${contact.twitter}`}>{contact.twitter}</a>
                    </p>
                )}
                {contact.notes && <p>{contact.notes}</p>}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form action="destroy" method="post" onSubmit={
                        (event)=>{
                            if(!confirm("Please confirm you want to delete this record.")){
                                event.preventDefault();
                            }
                        }
                    }>
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )

}
function Favorite({contact}){
    return(
        <Form method="post">
            <button name="favorite" aria-label={
                contact.favorite?"Remove from favorite": "Add to favorite"
            } value={contact.favorite?false:true} >
                {contact.favorite?"★" : "☆"}
            </button>
        </Form>
    )
}