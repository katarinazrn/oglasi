const Container = props =>{
    return(
        <div className="d-flex justify-content-center" >
            <div className="col-10 col-xs-10 col-sm-10 col-md-8  ">
                {props.children}
            </div>
        </div>
    )
}

export default Container;