const RoundImage = props => {
    const content = {
        backgroundImage: `url(${props.src})`,
        width: '100%', 
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const wrapper = {
        width: props.width,
        height: props.width,
        borderRadius: '50%',
        overflow: 'hidden'
    }
    return (
        <div style={wrapper}>
            <div style={content} />
        </div>
    )
}

export default RoundImage;