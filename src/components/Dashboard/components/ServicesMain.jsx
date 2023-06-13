import React from "react";
import { withRouter } from "../../../utils";
import ArticleCard from "./ArticleCard";
import DraggableCard from "./DraggableCard";
import DashboardContentLayout from "./DashboardContentLayout";


class ServicesMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceType: this.props.deviceType,
            activeTab: 'beauty',
            items: [
                { price: 2000, description: "This is a test description that needed to check possibilities of the system This is a test description that needed to check possibilities of the system This is a test description that needed to check possibilities of the system This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "24.12.2002", title: "This is the test title", statistics: { shown: 250 }, url: "chto-takoe-ruka-123", id: String(123), position: 1 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "10.10.2022", title: "Chto ruka", statistics: { shown: 150 }, url: "chto-ruka-124", id: String(124), position: 2 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "25.12.2012", title: "Chto a", statistics: { shown: 450 }, url: "chto-a-125", id: String(125), position: 3 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "24.12.2002", title: "This is the test title", statistics: { shown: 250 }, url: "chto-takoe-ruka-126", id: String(126), position: 4 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "10.10.2022", title: "Chto ruka", statistics: { shown: 150 }, url: "chto-ruka-127", id: String(127), position: 5 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "25.12.2012", title: "Chto a", statistics: { shown: 450 }, url: "chto-a-128", id: String(128), position: 6 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "24.12.2002", title: "This is the test title", statistics: { shown: 250 }, url: "chto-takoe-ruka-123", id: String(129), position: 1 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "10.10.2022", title: "Chto ruka", statistics: { shown: 150 }, url: "chto-ruka-124", id: String(130), position: 2 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "25.12.2012", title: "Chto a", statistics: { shown: 450 }, url: "chto-a-125", id: String(131), position: 3 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "24.12.2002", title: "This is the test title", statistics: { shown: 250 }, url: "chto-takoe-ruka-126", id: String(132), position: 4 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "10.10.2022", title: "Chto ruka", statistics: { shown: 150 }, url: "chto-ruka-127", id: String(133), position: 5 },
                { price: 2000, description: "This is a test description that needed to check possibilities of the system",previewLink: "", publicationDate: "25.12.2012", title: "Chto a", statistics: { shown: 450 }, url: "chto-a-128", id: String(134), position: 6 },
            ],
        }

        this.tabs = [
            { key: 'beauty', switch: this.switchBeauty, title: "Красота", first: true },
            { key: 'psycho', switch: this.switchPsycho, title: "Психология", first: false },
            { key: 'education', switch: this.switchEducation, title: "Обучение", first: false },
        ]
        this.title = "Услуги"
    }

    switchBeauty = () => {
        this.setState({ activeTab: 'beauty' });
        this.props.navigate(window.location.pathname + "?staus=beauty")
    }

    switchPsycho = () => {
        this.setState({ activeTab: 'psycho' });
        this.props.navigate(window.location.pathname + "?staus=psycho")
    }

    switchEducation = () => {
        this.setState({ activeTab: 'education' });
        this.props.navigate(window.location.pathname + "?staus=education")
    }

    addNewService = () => {

    }

    onSave = () => {

    }


    render() {
        return (
            <DashboardContentLayout
                tabsDict={this.tabs}
                title={this.title}
                elem={DraggableCard}
                deviceType={this.state.deviceType}
                activeTab={this.state.activeTab}
                needsDragnDrop={true}
                type={'services'}
                needsPrice={true}
                items={this.state.items}
                addNew={this.addNewService}
                onSave={this.onSave}
                showNotification={this.props.showNotification}
            />
        )
    }
}

export default withRouter(ServicesMain)