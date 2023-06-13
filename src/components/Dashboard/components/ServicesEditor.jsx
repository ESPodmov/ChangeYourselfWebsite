import React from "react";
import { withRouter } from "../../../utils";
import ImageCrop from "./ImageCrop";

class ServicesEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceType: this.props.deviceType,
            displayImageSrc: "https://i.pinimg.com/736x/5f/4a/e2/5f4ae232304819458ab7a5e6978a1f90.jpg",
            imageCropVisible: false,
            imageSrc: null,
            currentImageBlob: null,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //сохранить все на сервере
    }

    handleBack = (e) => {
        window.history.replaceState({}, "", "/dashboard/services")
        this.props.navigate("/dashboard/services")
    }

    handleUploadButton = () => {
        document.getElementsByName("image-input__file")[0].click()
    }


    handleImageUpload = (e) => {
        e.preventDefault()
        if (e.target.files.length > 0) {
            if (/^image\/.*$/.test(e.target.files[0].type)) {
                const imageURL = URL.createObjectURL(e.target.files[0])
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
                                Услуга
                            </span>
                        </div>
                        <form onSubmit={this.handleSubmit} className="editor_form" id="form" name="form">
                            <div className="editor__image-group-container">
                                <div className="editor__image-group-container_image-container">
                                    <img className="editor__image-container" src={this.state.displayImageSrc} />
                                </div>
                                <button className="editor__image-button" onClick={this.handleUploadButton}>
                                    <span>Изображение</span>
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
                                <input type="text" placeholder="Название" id="name" name="name" />
                            </div>
                            <div className="editor__group-container">
                                <textarea placeholder="Описание" id="description" name="description" />
                            </div>
                            <div className="editor__group-container flex">
                                <label htmlFor="price">Цена:</label>
                                <input type="text" placeholder="" id="price" name="price" />
                                <label htmlFor="price">₽</label>
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
                            aspect={3 / 4}
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
                                Услуга
                            </span>
                        </div>
                        <form onSubmit={this.handleSubmit} className="editor_form mobile" id="form" name="form">
                            <div className="editor__image-group-container">
                                <div className="editor__image-group-container_image-container">
                                    <img className="editor__image-container" src={this.state.displayImageSrc} />
                                </div>
                                <button className="editor__image-button" onTouchEnd={this.handleUploadButton}>
                                    <span>Изображение</span>
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
                                <input type="text" placeholder="Название" id="name" name="name" />
                            </div>
                            <div className="editor__group-container">
                                <textarea placeholder="Описание" id="description" name="description" />
                            </div>
                            <div className="editor__group-container flex">
                                <label htmlFor="price">Цена:</label>
                                <input type="text" placeholder="" id="price" name="price" />
                                <label htmlFor="price">₽</label>
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
                            aspect={3 / 4}
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

export default withRouter(ServicesEditor)