import module from './css/Guidelines.module.css'

export default function Guidelines () {
    return(
        <div className={module.container}>
            <h1>Picme Community Guidelines</h1>
            <p><span>Respect Each Other:</span> Always be respectful and kind; no harassment, bullying, or hate speech.</p>
            <p><span>Keep it Appropriate:</span> No obscene, violent, or offensive content.</p>
            <p><span>Share Responsibly:</span> Be mindful of what you post and respect others' privacy.</p>
            <p><span>Stay Legal:</span> No illegal activities or content.</p>
            <p><span>Respect Copyrights:</span> Only upload content you own or have the right to use.</p>
            <p><span>Report Issues:</span> Help keep our community safe by reporting any inappropriate behavior.</p>
            <p><span>No Spam:</span> Avoid spamming and irrelevant advertisements.</p>
            <p><span>Stay on Topic:</span> Keep content relevant to the community's purpose.</p>
            <p><b>Violating these guidelines may lead to content removal or account suspension.</b></p>
        </div>
    )
}