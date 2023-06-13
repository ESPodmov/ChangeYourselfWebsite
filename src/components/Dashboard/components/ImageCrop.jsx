import '../style.css'

import React from 'react'
import Slider from '@mui/material/Slider'
import Cropper from 'react-easy-crop'

class ImageCrop extends React.Component {
    state = {
        imageSrc: this.props.imageSrc,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: this.props.aspect,
        croppedAreaPixels: null,
        croppedImage: null,
        deviceType: this.props.deviceType,
    }

    onCropChange = (crop) => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedAreaPixels)
        this.setState({ croppedAreaPixels })
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom })
    }

    onClose = () => {
        this.props.close()
    }

    onSubmit = async () => {
        try {
            const croppedImage = await getCroppedImg(
                this.state.imageSrc,
                this.state.croppedAreaPixels,
            )

            this.props.submit(croppedImage)

        } catch (e) {
            console.error(e)
        }
    }

    render() {
        if (true) {
            return (
                <div className='image-crop__main-container'>
                    <div className="crop-container">
                        <Cropper
                            image={this.state.imageSrc}
                            crop={this.state.crop}
                            zoom={this.state.zoom}
                            aspect={this.state.aspect}
                            onCropChange={this.onCropChange}
                            onCropComplete={this.onCropComplete}
                            onZoomChange={this.onZoomChange}
                        />
                    </div>
                    <div className="controls">
                        <Slider
                            value={this.state.zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoom) => this.onZoomChange(zoom)}
                            classes={{ container: 'slider' }}
                        />
                    </div>
                    <div className='croppper__button-container'>
                        <button onClick={this.onSubmit} className='editor__form-button '>Готово</button>
                        <button onClick={this.onClose} className='editor__form-button cropper__cancel-button'>Отмена</button>
                    </div>
                </div>
            )
        }
    }
}


const createImage = async (url) =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })


function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180
}

export function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation)

    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    }
}

async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const rotRad = getRadianAngle(rotation)

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    )

    canvas.width = bBoxWidth
    canvas.height = bBoxHeight

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.translate(-image.width / 2, -image.height / 2)

    ctx.drawImage(image, 0, 0)

    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    )

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.putImageData(data, 0, 0)

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            resolve(file)
        }, 'image/jpeg')
    })
}


export default ImageCrop
