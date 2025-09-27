export const emailValid = (email:string) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export const passwordValid = (password:string) => {
  return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
}

export const nameValid = (userName:string) : string => {
  const data = userName.trim()
  let status = false
  let words = ''
  if(data.length > 1) {
    const arr = data.split(" ")
    if(arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if(item.length > 1) {
          status = true
          words += firstCharUpper(item) + ' '
        }else {
          status = false
        }
        
      }
    }
  }

  return status === true ? words.trim() : ''
}

export const surnameValid = (userSurname:string) : string => {
  const data = userSurname.trim()
  let status = false
  let words = ''
  if(data.length > 1) {
    const arr = data.split(" ")
    if(arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if(item.length > 1) {
          status = true
          words += firstCharUpper(item) + ''
        }else {
          status = false
        }
        
      }

    }
  }
  return status === true ? words.trim() : ''
}

export const firstCharUpper = (item:string) : string => {
  item = item.toLocaleLowerCase('tr')
  const first = item[0].toLocaleUpperCase('tr')
  item = item.substring(1, item.length)
  item = first + item
  return item
}

// JWT Token Utilities
export const getCurrentUser = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

export const isUserLoggedIn = (): boolean => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('enrolledCourses');
}

