import './footer.component.css'
const gitHubLogo = require('../../assets/Logos/GitHub.png')
const twitterLogo = require('../../assets/Logos/Twitter.png')
const linkedinLogo = require('../../assets/Logos/LinkedIn.png')

const Footer = () => {
    return(
        <div className='footer'>
            <p>Designed and Developed by Jyotirmoy Das 
                <span>
                    <a href="https://github.com/jyotirmoy1997" target="_blank">
                        <img src={gitHubLogo} alt="" srcset="" height="17px" width="17px"/>
                    </a> 
                    <a href="https://twitter.com/DosJoehan?t=lCmtkWL2P5e7dh3v6P-aSw&s=08" target="_blank">
                        <img src={twitterLogo} alt="" srcset="" height="17px" width="17px"/>
                    </a>
                    <a href="www.linkedin.com/in/jyotirmoy-das" target="_blank">
                        <img src={linkedinLogo} alt="" srcset="" height="17px" width="20px"/>
                    </a>
                </span>
                
            </p>
        </div>
        
    )
}

export default Footer