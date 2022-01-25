

export default function MyAccountDataSectionListItem({name, value}) {
    return (<div className="myaccount-data-section-list-item">
        <div className="myaccount-data-section-list-item-name">{name}</div>
        <div className="myaccount-data-section-list-item-value">{value}</div>
    </div>);
}