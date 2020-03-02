import React from 'react'
import axios from 'axios'
const cloudinaryUserKey = 'hrs4ajmd'

class ImageUpload extends React.Component {
  state = {
    image: null,
    original: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', cloudinaryUserKey) // this is your user key from your cloudinary account
    console.log(data)
    const res = await axios.post('https://api.cloudinary.com/v1_1/dhlfx2wwa/image/upload', data)
    console.log(res.data.url)
    this.setState({ image: res.data.url, original: files[0].name }, () => {
      this.props.handleChangeImage({ target: { name: this.props.fieldName, value: res.data.url } }) 
    })
  }

  render() {
    return (
      <div className="file has-name is-fullwidth">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" onChange={this.handleUpload} />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              {this.props.labelText}
            </span>
          </span>
          <span className="file-name">
            {this.state.original || 'No image selected'} 
          </span>
        </label>
      </div>
      
    )
  }
}

export default ImageUpload