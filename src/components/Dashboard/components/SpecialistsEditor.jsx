import React from "react";
import { withRouter } from "../../../utils";
import ImageCrop from "./ImageCrop";
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';

class SpecialistsEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceType: this.props.deviceType,
            displayImageSrc: "https://i.pinimg.com/736x/5f/4a/e2/5f4ae232304819458ab7a5e6978a1f90.jpg",
            imageCropVisible: false,
            imageSrc: null,
            currentImageBlob: null,
            checkBoxes: { 'beauty': false, 'psycho': false, "education": false }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //сохранить все на сервере
    }

    handleBack = (e) => {
        window.history.replaceState({}, "", "/dashboard/specialists")
        this.props.navigate("/dashboard/specialists")
    }

    handleUploadButton = () => {
        document.getElementsByName("image-input__file")[0].click()
    }


    handleImageUpload = (e) => {
        e.preventDefault()
        if (e.target.files.length > 0) {
            if (/^image\/.*$/.test(e.target.files[0].type)) {
                const imageURL = URL.createObjectURL(e.target.files[0])
                console.log("Openning image")
                console.log(imageURL)
                this.setState({ imageSrc: imageURL, imageCropVisible: true });
            }
        }
    }

    closeCropImage = () => {
        this.setState({ imageCropVisible: false });
    }

    getCroppedImage = (blob) => {
        const displayImageSrc = URL.createObjectURL(blob)
        this.setState({ displayImageSrc, imageCropVisible: false, currentImageBlob: blob })
    }

    getBase64FromBlob = (blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            var base64data = reader.result;
            return base64data;
        }
    }

    handleChange = (event) => {
        console.log(this.state.checkBoxes)
        this.setState({checkBoxes: {...this.state.checkBoxes, [event.target.name]: event.target.checked}})
    }

    render() {
        if (this.state.deviceType === "desktop") {
            return (
                <div className="editor-wrapper">
                    <div className="editor__main-container">
                        <div className="editor__header">
                            <div className="back-arrow-container" onClick={this.handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                    <polyline points="244 400 100 256 244 112" style={{ fill: "none", stroke: '#000', strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "30px" }} />
                                    <line x1="120" y1="256" x2="412" y2="256" style={{ fill: "none", stroke: '#000', strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "30px" }} />
                                </svg>
                            </div>
                            <span className="editor__header_title">
                                Специалист
                            </span>
                        </div>
                        <form onSubmit={this.handleSubmit} className="editor_form" id="form" name="form">
                            <div className="editor__image-group-container">
                                <div className="editor__image-group-container_image-container">
                                    <img className="editor__image-container" src={this.state.displayImageSrc} />
                                </div>
                                <button className="editor__image-button" onClick={this.handleUploadButton}>
                                    <span>Фотография</span>
                                </button>
                                <input
                                    className="editor__image-input"
                                    type="file"
                                    accept="image/png,image/jpeg,image/bmp,image/x-ms-bmp,image/webp,image/gif"
                                    name="image-input__file"
                                    multiple={false}
                                    onChange={this.handleImageUpload}
                                />
                            </div>
                            <div className="editor__group-container">
                                <input type="text" placeholder="Имя" id="name" name="name" />
                            </div>
                            <div className="editor__group-container">
                                <textarea placeholder="Описание/Заслуги" id="description" name="description" />
                            </div>
                            <div className="editor__group-container flex">
                                <div className="checkboxes-container">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.checkBoxes.beauty} onChange={this.handleChange} name="beauty" size='small' />
                                    }
                                    sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                    label="Красота"
                                /><FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.checkBoxes.psycho} onChange={this.handleChange} name="psycho" size='small'/>
                                    }
                                    sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                    label="Психология"
                                /><FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.checkBoxes.education} onChange={this.handleChange} name="education" size='small'/>
                                    }
                                    sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                    label="Обучение"
                                />
                                </div>
                            </div>
                        </form>
                        <div className="editor__button-container">
                            <input type="submit" htmlFor="form" value="Сохранить" className="editor__form-button" />
                            <button className="editor__form-button cancel" onClick={this.handleBack}>
                                Отмена
                            </button>
                        </div>
                    </div>
                    {this.state.imageCropVisible &&
                        <ImageCrop
                            deviceType={this.state.deviceType}
                            aspect={1 / 2}
                            imageSrc={this.state.imageSrc}
                            close={this.closeCropImage}
                            submit={this.getCroppedImage}
                        />
                    }
                </div>
            )
        } else {
                return (
                    <div className="editor-wrapper">
                        <div className="editor__main-container mobile">
                            <div className="editor__header">
                                <div className="back-arrow-container" onTouchEnd={this.handleBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                        <polyline points="244 400 100 256 244 112" style={{ fill: "none", stroke: '#000', strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "30px" }} />
                                        <line x1="120" y1="256" x2="412" y2="256" style={{ fill: "none", stroke: '#000', strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "30px" }} />
                                    </svg>
                                </div>
                                <span className="editor__header_title">
                                    Специалист
                                </span>
                            </div>
                            <form onSubmit={this.handleSubmit} className="editor_form mobile" id="form" name="form">
                                <div className="editor__image-group-container">
                                    <div className="editor__image-group-container_image-container">
                                        <img className="editor__image-container" src={this.state.displayImageSrc} />
                                    </div>
                                    <button className="editor__image-button" onTouchEnd={this.handleUploadButton}>
                                        <span>Фотография</span>
                                    </button>
                                    <input
                                        className="editor__image-input"
                                        type="file"
                                        accept="image/png,image/jpeg,image/bmp,image/x-ms-bmp,image/webp,image/gif"
                                        name="image-input__file"
                                        multiple={false}
                                        onChange={this.handleImageUpload}
                                    />
                                </div>
                                <div className="editor__group-container">
                                    <input type="text" placeholder="Имя" id="name" name="name" />
                                </div>
                                <div className="editor__group-container">
                                    <textarea placeholder="Описание/Заслуги" id="description" name="description" />
                                </div>
                                <div className="editor__group-container flex">
                                    <div className="checkboxes-container">
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.checkBoxes.beauty} onChange={this.handleChange} name="beauty" size='small' />
                                        }
                                        sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                        label="Красота"
                                    /><FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.checkBoxes.psycho} onChange={this.handleChange} name="psycho" size='small'/>
                                        }
                                        sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                        label="Психология"
                                    /><FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.checkBoxes.education} onChange={this.handleChange} name="education" size='small'/>
                                        }
                                        sx={{'& .MuiTypography-root': {fontSize: 13, fontFamily: "-apple-system, system-ui, 'Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', sans-serif"}}}
                                        label="Обучение"
                                    />
                                    </div>
                                </div>
                            </form>
                            <div className="editor__button-container">
                                <input type="submit" htmlFor="form" value="Сохранить" className="editor__form-button" />
                                <button className="editor__form-button cancel" onTouchEnd={this.handleBack}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                        {this.state.imageCropVisible &&
                            <ImageCrop
                                deviceType={this.state.deviceType}
                                aspect={1 / 2}
                                imageSrc={this.state.imageSrc}
                                close={this.closeCropImage}
                                submit={this.getCroppedImage}
                            />
                        }
                    </div>
            )
        }
    }
}

export default withRouter(SpecialistsEditor)