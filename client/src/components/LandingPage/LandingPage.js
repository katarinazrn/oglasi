const LandingPage = () => {
    return (
        <div>
            <div className="bg-info pt-4">
                <h1 className="text-white">Find your dream job here</h1>
                <h1>??? Job Listed Here</h1>
                <h4>Find The Right Job</h4>
                <div className="d-flex">
                    <div className="col-4">
                    <input className='form-control' type='search' />
                </div>
                <button className="btn btn-secondary ms-2">Find</button>
            </div>
            <div >Latest jobs</div>
            <div>Find your dream job here</div>
            <img className="col-3" src='https://miro.medium.com/max/824/0*sxDG2hKEnhqpEyKQ.png' />
            <img className="col-3" src='https://www.eubusinessnews.com/wp-content/uploads/2021/03/Happy-employees.jpg' />
        </div>
        </div >
    )
}

export default LandingPage;