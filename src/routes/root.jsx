export default function Root(){
    return(
        <>
        <div className="sidebar">
            <h1>React Router Contacts</h1>
            <div>
                <form id="search-form" role="search">
                    <input type="search" name="q" placeholder="Search" id="q" aria-label="Search contacts" />
                    <div className="search-spinner" aria-hidden hidden={true}></div>
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <form action="#" method="post">
                    <button type="submit">New</button>
                </form>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href={`/contacts/1`}>Your Name</a>
                    </li>
                    <li>
                        <a href={`/contacts/2`}>Your Friend Name</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="detail" id="detail"></div>
        </>
    )
}