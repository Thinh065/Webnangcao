import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { setUserDetails } from '../store/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.user?.user);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });

      const responseData = await response.json();

      if (responseData.success) {
        setUserInfo(responseData.data);
        setNewName(responseData.data?.name || '');
      } else {
        toast.error(responseData.message || 'Không thể tải thông tin người dùng');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      toast.error('Tên không được để trống');
      return;
    }

    try {
      setUpdating(true);
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userInfo?._id,
          name: newName
        })
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success('Cập nhật tên thành công');
        setEditMode(false);

        // Cập nhật thông tin người dùng trong state và Redux
        setUserInfo({
          ...userInfo,
          name: newName
        });

        // Cập nhật thông tin trong Redux store
        const updatedUserData = {
          ...userData,
          name: newName
        };
        dispatch(setUserDetails(updatedUserData));

        // Làm mới thông tin người dùng
        fetchUserData();
      } else {
        toast.error(responseData.message || 'Không thể cập nhật tên');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật tên');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="animate-pulse p-4 max-w-md mx-auto">
          <div className="h-32 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-6 bg-slate-200 rounded mb-2"></div>
          <div className="h-6 bg-slate-200 rounded mb-2"></div>
          <div className="h-6 bg-slate-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] p-4 mt-20">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 bg-primary-600 text-white">
          <h1 className="text-xl font-bold">Thông tin cá nhân</h1>
        </div>

        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div className="text-8xl text-gray-400 bg-gray-100 rounded-full p-6">
              <FaRegCircleUser />
            </div>
          </div>

          <div className="mb-4">
            {editMode ? (
              <form onSubmit={handleUpdateName} className="flex flex-col items-center">
                <div className="mb-2 w-full">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nhập tên mới"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-1 rounded hover:bg-primary-700"
                    disabled={updating}
                  >
                    {updating ? 'Đang lưu...' : 'Lưu'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                    onClick={() => {
                      setEditMode(false);
                      setNewName(userInfo?.name || '');
                    }}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center">
                <h2 className="text-xl font-bold text-center">{userInfo?.name}</h2>
                <button
                  className="ml-2 text-gray-500 hover:text-primary-600"
                  onClick={() => {
                    setEditMode(true);
                    setNewName(userInfo?.name || '');
                  }}
                >
                  <FaEdit />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">Email:</span>
              <span>{userInfo?.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">Vai trò:</span>
              <span className="capitalize">{userInfo?.role}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">Ngày tạo:</span>
              <span>{moment(userInfo?.createdAt).format('DD/MM/YYYY')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;