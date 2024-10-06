/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
export const fetchData = async (endPoint: string): Promise<any> => {
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        throw error;
    }
}

export const putData = async (endPoint: string, data: any): Promise<any> => {
    try {
        const response = await fetch(endPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const responseData = await response.json();
            const errorMsg = 'Message' in responseData ? responseData.Message : response.statusText;

            const error = new Error(errorMsg) as any;
            error.status = response.status;
            throw error;
        }
    } catch (error) {
        throw error;
    }
}

export const postData = async (endPoint: string, data: any): Promise<any> => {
    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const responseData = await response.json();
            const errorMsg = 'Message' in responseData ? responseData.Message : response.statusText;

            const error = new Error(errorMsg) as any;
            error.status = response.status;
            throw error;
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (endPoint: string, data?: any): Promise<any> => {
    try {
        const response = await fetch(endPoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : undefined,
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw error;
    }
}