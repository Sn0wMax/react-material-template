export const SET_LOCAL_USER = 'SET_LOCAL_USER';
export const INVALIDATE_LOCAL_USER = 'INVALIDATE_LOCAL_USER';

export function setLocalUser(user) {
  return {
    type: SET_LOCAL_USER,
    data: user
  };
}

export function invalidateLocalUser() {
  return {
    type: INVALIDATE_LOCAL_USER
  };
}
