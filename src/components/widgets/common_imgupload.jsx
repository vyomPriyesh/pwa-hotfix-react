import React from 'react'
import { Input } from '../ui/input'
import { Label } from "../../components/ui/label";
import AuthService from '../../service/auth.service';
import config from '../../config';

const CommonImgupload = ({ value, onChange }) => {

    const IMG_URL = config.baseImage;

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append("images", file)
        const response = await AuthService.imageUpload(formData)
        if (response.data.success) {
            onChange(IMG_URL+response.data.data[0])
        }
    };
    return (
        <div className="">
            <Label
                htmlFor="profiles"
                className="h-16 w-16 lg:h-20 lg:w-20 xxl:h-24 xxl:w-24 overflow-hidden border border-border rounded-md cursor-pointer flex items-center justify-center"
            >
                <img
                    src={value}
                    alt="Profile"
                    className="w-full h-full object-cover bg-center"
                />
            </Label>
            <Input
                type="file"
                id="profiles"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    )
}

export default CommonImgupload
