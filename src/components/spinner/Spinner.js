import { Oval } from 'react-loader-spinner'
const Spinner = () => {
    return (
        <Oval
            visible={true}
            height="80"
            width="80"
            color="#FF5631"
            secondaryColor='#CEBEA4'
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Spinner;