# useAxios hook


## Description

This is a custom hook to make any CRUD operation using axios.

## Example

```html
import { useAxios } from 'Hooks/useAxios';

const App = () => {
    const { response, loading, error } = useAxios({
        method: 'POST',
        url: '/testURL',
        headers: { 
          accept: '*/*'
        },
        data: {  
            id: 1,
            name: 'Kumar',
            comment: 'Sample text',
        },
    });
    return (
        <div className='App'>
            <h1>Users</h1>

            {loading ? (
                <p>loading...</p>
            ) : (
                <div>
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                    <div> {
                      // no need to use another state to store data, response is sufficient
                      response && <p>{response.id}</p>
                    }
                    </div>
                </div>
            )}
        </div>
    );
};
```
### Similarly, we can do for get, put and delete