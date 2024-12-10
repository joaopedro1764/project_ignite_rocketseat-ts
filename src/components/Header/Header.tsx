import styles from './Header.module.css'
import igniteLogo from '../../assets/Ignite-Logo.svg'
export const Header = () => {

    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt='LogoTipo do Ignite'/>
        </header>
    )
}