const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center my-16 w-1/2">
            <p className="text-yellow-300 italic">---- {subHeading} ----</p>
            <h3 className="text-6xl border-y-4 py-4 mt-2 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;