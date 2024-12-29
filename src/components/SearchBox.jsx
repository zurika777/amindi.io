import propTypes from 'prop-types'
 export  const SearchBox = (props) => {
    const {
        search,
        changeSearch,
    } = props;
    return (
        <div className="col-12 d-flex justify-content-center align-items-center"
    style={{
    height: '100px',
        }}
        >
            <input className="rounded-pill border border-primary-subtle  w-50 p-2"

                   type="text"
                   placeholder="Search..."
                   value={search}
                   onChange={changeSearch}
            />
        </div>
    )
};

    SearchBox.propTypes ={
    search: propTypes.string.isRequired,
    changeSearch: propTypes.func.isRequired,

};