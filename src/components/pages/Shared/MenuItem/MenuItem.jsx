const MenuItem = ({item}) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex m-2 gap-x-2">
            <img 
            style={{borderRadius: '0px 200px 200px 200px'}}
            className="w-[120px]"
            src={image} alt="" />
            <div>
                <p className="uppercase">{name}------------------------------</p>
                <p>{recipe}</p>
            </div>
            <span className="text-yellow-400">${price}</span>
        </div>
    );
};

export default MenuItem;