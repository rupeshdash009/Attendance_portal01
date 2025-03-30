import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiBook, FiAward, FiCalendar, FiEdit2, FiSave, FiAlertCircle 
} from 'react-icons/fi';

function StudentProfile() {
  // Empty initial data
  const initialData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    rollNumber: '',
    semester: ''
  };

  const [user, setUser] = useState(initialData);
  const [editMode, setEditMode] = useState(true); // Start in edit mode
  const [formData, setFormData] = useState({...initialData});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUser(formData); // Update the displayed user data
      setEditMode(false); // Switch to view mode
      alert('Profile saved successfully!');
    }
  };

  const handleEdit = () => {
    // Copy current user data to form data when entering edit mode
    setFormData({...user});
    setEditMode(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {editMode ? 'Complete Your Profile' : 'Student Profile'}
          </h1>
          <p className="opacity-90">
            {editMode ? 'Please fill in all required information' : 'View your profile information'}
          </p>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <form onSubmit={handleSave}>
            {/* Edit/Save Button */}
            <div className="flex justify-end mb-6">
              {editMode ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FiSave /> Save Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                  <FiUser /> Personal Details
                </h2>
                
                <ProfileField 
                  icon={<FiUser />}
                  label="Full Name *"
                  name="name"
                  value={editMode ? formData.name : user.name}
                  onChange={handleInputChange}
                  editMode={editMode}
                  error={errors.name}
                  required
                />
                
                <ProfileField 
                  icon={<FiMail />}
                  label="Email *"
                  name="email"
                  value={editMode ? formData.email : user.email}
                  onChange={handleInputChange}
                  editMode={editMode}
                  type="email"
                  error={errors.email}
                  required
                />
                
                <ProfileField 
                  icon={<FiPhone />}
                  label="Phone"
                  name="phone"
                  value={editMode ? formData.phone : user.phone}
                  onChange={handleInputChange}
                  editMode={editMode}
                  type="tel"
                />
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-gray-500">
                    <FiMapPin />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500 mb-1">Address</label>
                    {editMode ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                        rows={3}
                        placeholder="Enter your address"
                      />
                    ) : (
                      <p className="whitespace-pre-line">
                        {user.address || <span className="text-gray-400">Not provided</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2 flex items-center gap-2">
                  <FiBook /> Academic Information
                </h2>
                
                <ProfileField 
                  icon={<FiBook />}
                  label="Department *"
                  name="department"
                  value={editMode ? formData.department : user.department}
                  onChange={handleInputChange}
                  editMode={editMode}
                  selectOptions={['', 'BBA', 'BCA']}
                  error={errors.department}
                  required
                />
                
                <ProfileField 
                  icon={<FiAward />}
                  label="Roll Number *"
                  name="rollNumber"
                  value={editMode ? formData.rollNumber : user.rollNumber}
                  onChange={handleInputChange}
                  editMode={editMode}
                  error={errors.rollNumber}
                  required
                />
                
                <ProfileField 
                  icon={<FiCalendar />}
                  label="Semester *"
                  name="semester"
                  value={editMode ? formData.semester : user.semester}
                  onChange={handleInputChange}
                  editMode={editMode}
                  selectOptions={['', '1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem']}
                  error={errors.semester}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable Profile Field Component
function ProfileField({ icon, label, name, value, onChange, editMode, type = 'text', selectOptions, error, required }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-gray-500">
        {icon}
      </div>
      <div className="flex-1">
        <label className="block text-sm text-gray-500 mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
        {!editMode ? (
          <p>{value || <span className="text-gray-400">Not provided</span>}</p>
        ) : selectOptions ? (
          <>
            <select
              name={name}
              value={value}
              onChange={onChange}
              className={`w-full border rounded p-2 ${error ? 'border-red-500' : ''}`}
            >
              {selectOptions.map(option => (
                <option key={option} value={option}>
                  {option || 'Select an option'}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <FiAlertCircle /> {error}
              </p>
            )}
          </>
        ) : (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className={`w-full border rounded p-2 ${error ? 'border-red-500' : ''}`}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <FiAlertCircle /> {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;