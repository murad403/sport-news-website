import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <main className='max-w-2xl w-full'>
                {children}
            </main>
        </div>
    )
}

export default layout