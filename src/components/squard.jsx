

const Squard = (props) => {

    return <div onClick={props.onClick} className="bg-gray-300 w-24 h-24 cursor-pointer flex items-center justify-center text-2xl">
        {props.info}
    </div>
}

export default Squard