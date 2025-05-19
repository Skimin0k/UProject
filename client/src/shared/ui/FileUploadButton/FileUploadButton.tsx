// shared/ui/FileUploadButton.tsx
import React, {useEffect, useRef, useState} from 'react'
import {Image} from 'shared/ui/Image/Image'

interface FileUploadButtonProps {
    onFileSelected: (file: File) => void;
    className?: string;
    text?: string;
    previewSize?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = (props) => {
    const {
        onFileSelected,
        text,
        className,
        previewSize = '40px'
    } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        if (file) {
            onFileSelected(file)
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        }
        e.target.value = ''
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                {text}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            {previewUrl &&
                    <Image
                        src={previewUrl}
                        alt={'Preview'}
                        size={'200px'}
                    />
            }
        </>
    )
}