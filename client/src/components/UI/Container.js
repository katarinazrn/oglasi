const Container = props =>{
    return(
        <div className="d-flex justify-content-center">
            <div className="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
                {props.children}
            </div>
        </div>
    )
}

export default Container;