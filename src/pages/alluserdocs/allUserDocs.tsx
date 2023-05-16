import "./allUserDocs.css"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import ADD from "../../images/add.png"
import DOC from "../../images/google-docs.png"
import DESCDOC from "../../images/doc.jpeg"

type Doc = {
    docid: number
    docname: string
    docdata: string
    userid: number
}
function CurrUserDocs(){
    const {currentUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [userDocs, setUserDocs] = useState([]);

    const [show, setShow] = useState(false);
    const [nwDoc, setNwDoc] = useState("");

    const getCurrUserDocs = async() => {
        setLoading(true);
        const url = `http://localhost:8080/v1/docs/getAllUserDoc/${currentUser?.id}`;
        const res = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type":"application/json"
            },
        }).then(res => res.json());
        setLoading(false)
        console.log(res);
        setUserDocs(res);
    }
    useEffect(() => {
        if(currentUser){
            getCurrUserDocs();
        }
    }, [currentUser])

    const createDoc = async() => {
        const url = "http://localhost:8080/v1/docs/createUserDoc";
        const res = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                "nwtitle": nwDoc,
                "curruser": Number(currentUser?.id)
            })
        }).then(res => res.json());
        console.log(res);
        setNwDoc("");
        setShow(false);
        getCurrUserDocs();
    }
    const toggle = () => {
        show ? setShow(false) : setShow(true)
    }
  
    return (
        <div id="docMain">
            <div id="addWrapper">
                <div id="addDoc">
                <img alt="" id="addImg" src={ADD} onClick={toggle}></img>
                {
                    show ? (
                        <div id="inpWrapper">
                            <input id="docInp" value={nwDoc} onChange={e => setNwDoc(e.target.value)}></input>
                            <span id="addBtn" onClick={createDoc}>ADD</span>
                        </div>
                    ) : (null)
                }
                </div>  
                <div id="docDisplay">
                    <div id="docDescImg" style={{backgroundImage:`url(${DESCDOC})`}}></div>
                    <div id="docDesc">
                        <h2>Track Your Prorgress</h2>
                        <p>Create a document where you can keep track of your notes and time studying</p>
                    </div>
                </div>
            </div>
            <div id="docsContainer">
            {
                loading ? (<p>...loading</p>) : (
                    userDocs.map((item:Doc, idx) => {
                        return(
                            <div key={idx} id="docName">
                                <img alt="" id="docImg" src={DOC}></img>
                                <hr></hr>
                                <Link to={`/study/${item.docname}`} id="docLink">{item.docname}</Link>
                            </div>
                        )
                    })
                )
            }
            </div>
        </div>
    )
}
export default CurrUserDocs;