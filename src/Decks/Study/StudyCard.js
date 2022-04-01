import React, {useEffect, useState} from "react";

const flipView = {
    front: "back",
    back: "front",
}

export default function StudyCard({ card = {}, title, children}) {
    const [side, setSide] = useState('front');
    const [flipped, setFlipped] = useState(false);

    function switchSide() {
        setSide((prevState) => flipView[prevState]);
        setFlipped(true);
    }

    useEffect(() => {
        setSide('front');
        setFlipped(false);
    }, [card])
   
    return (
        <div className={`card ${side} study-card`}>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">
                    {card[side]}
                    </p>
                    <button type="button" className="btn btn-secondary" onClick={switchSide}>
                        Flip
                    </button>
                    {flipped && children}
                </div>
        </div>
    )


}