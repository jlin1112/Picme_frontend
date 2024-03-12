import module from './Loader.module.css'

export default function Loader () {
    return(
        <div className={module["loading-wrapper"]}>
          <div className={module["custom-loader"]}></div>
        </div>
    )
}