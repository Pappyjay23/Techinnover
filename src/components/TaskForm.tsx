import { useRef, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import {
	IoCloudUploadOutline,
	IoTimeOutline,
	IoTrashOutline,
} from "react-icons/io5";

interface TaskFormProps {
	initialData?: {
		title: string;
		description: string;
		priority: string;
		image?: string;
		date: string;
		time: string;
	};
	onSubmit: (data: any) => void;
	buttonText: string;
}

interface FileInfo {
	preview: string;
	name: string;
	size: number;
}

const priorities = [
	{
		label: "High",
		value: "HIGH",
		color: "text-[#4F9C20] bg-[#EBFAE2]",
		dropDownColor: "text-[#4F9C20] hover:bg-[#EBFAE2]",
	},
	{
		label: "Medium",
		value: "MEDIUM",
		color: "text-[#3069FE] bg-[#E2F0FF]",
		dropDownColor: "text-[#3069FE] hover:bg-[#E2F0FF]",
	},
	{
		label: "Low",
		value: "LOW",
		color: "text-[#E60C02] bg-[#FFE2E2]",
		dropDownColor: "text-[#E60C02] hover:bg-[#FFE2E2]",
	},
];

const TaskForm = ({ initialData, onSubmit, buttonText }: TaskFormProps) => {
	const [formData, setFormData] = useState({
		title: initialData?.title || "",
		description: initialData?.description || "",
		priority: initialData?.priority || "",
		image: initialData?.image || "",
		date: initialData?.date || "",
		time: initialData?.time || "",
	});

	const [showDropdown, setShowDropdown] = useState(false);
	const [fileInfo, setFileInfo] = useState<FileInfo | null>(
		initialData?.image
			? {
					preview: initialData.image,
					name: "Uploaded Image",
					size: 10,
			  }
			: null
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result as string;
				setFileInfo({
					preview: reader.result as string,
					name: file.name,
					size: Math.round(file.size / 1024),
				});
				setFormData((prev) => ({ ...prev, image: base64Image }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result as string;
				setFileInfo({
					preview: reader.result as string,
					name: file.name,
					size: Math.round(file.size / 1024),
				});
				setFormData((prev) => ({ ...prev, image: base64Image }));
			};
			reader.readAsDataURL(file);
		}
	};

	const removeFile = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFileInfo(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const formatFileSize = (size: number) => {
		return `${size} KB`;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// onSubmit(formData);
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label className='block mb-1 text-[85%] font-medium'>Task Name</label>
				<input
					type='text'
					value={formData.title}
					required
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					placeholder='Enter task name'
					className='w-full p-2 border border-[#D0D5DD] font-light rounded-lg text-[95%] outline-none'
				/>
			</div>

			<div>
				<label className='block mb-1 text-[85%] font-medium'>
					Description{" "}
					<span className='text-gray-400 font-light'>(Optional)</span>
				</label>
				<textarea
					value={formData.description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					placeholder='Write more on the task....'
					style={{ resize: "none" }}
					className='w-full p-2 border border-[#D0D5DD] font-light rounded-lg min-h-[100px] text-[95%] outline-none'
				/>
			</div>

			<div>
				<label className='block mb-1 text-[85%] font-medium'>Priority</label>
				<div className='relative'>
					<button
						type='button'
						onClick={() => setShowDropdown(!showDropdown)}
						className='w-full p-3 border border-[#D0D5DD] rounded-lg outline-none relative flex items-center justify-between'>
						<span
							className={`p-2 rounded-sm text-xs font-normal ${
								priorities.find((p) => p.value === formData.priority)?.color ||
								"text-gray-400"
							}`}>
							{priorities.find((p) => p.value === formData.priority)?.label ||
								"Select priority"}
						</span>
						<IoIosArrowDown className='cursor-pointer' />
					</button>
					{showDropdown && (
						<div className='absolute bottom-[-80px] right-[15px] w-42 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-10 overflow-hidden'>
							{priorities.map((priority) => (
								<button
									key={priority.value}
									className={`w-full text-left px-4 py-2 text-xs transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-between ${priority.dropDownColor}`}
									onClick={() => {
										setFormData({ ...formData, priority: priority.value });
										setShowDropdown(false);
									}}>
									<span>{priority.label}</span>
									{formData.priority === priority.value && <IoMdCheckmark />}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			<div>
				<label htmlFor='file-upload' className='block text-[85%] font-medium'>
					Upload cover{" "}
					<span className='text-gray-400 font-light'>(Optional)</span>
				</label>
				{!fileInfo ? (
					<div
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						className='border-2 border-dashed border-[#D0D5DD] rounded-lg p-4 text-center mt-1 cursor-pointer'
						onClick={() => fileInputRef.current?.click()}>
						<span className='p-2 bg-[#F2F4F7] rounded-full inline-block mb-3'>
							<IoCloudUploadOutline size={20} className='text-[#475467]' />
						</span>
						<p className='text-sm text-gray-500 font-light'>
							<span className='text-[#6941C6] mb-1 font-medium'>
								Click to upload
							</span>{" "}
							or drag and drop
						</p>
						<p className='text-xs font-light text-[#667085] mt-1'>PNG or JPG</p>
					</div>
				) : (
					<div className='border border-[#E4E7EC] rounded-lg p-4 bg-white mt-1'>
						<div className='flex items-center gap-3'>
							<img
								src={fileInfo.preview || "/placeholder.svg"}
								alt='Preview'
								className='w-[50%] h-20 object-cover rounded'
							/>
							<div className='flex-1'>
								<p className='text-sm text-[#344054] mb-1'>{fileInfo.name}</p>
								<p className='text-xs text-[#667085] font-light'>
									{formatFileSize(fileInfo.size)}
								</p>
								<div className='flex gap-2 items-center mt-2'>
									<div className='h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden'>
										<div
											className='h-full bg-[#4F35F3] rounded-full'
											style={{ width: "100%" }}
										/>
									</div>
									<span className='text-xs font-normal'>100%</span>
								</div>
							</div>
							<button
								type='button'
								onClick={removeFile}
								className='p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer'>
								<IoTrashOutline className='w-5 h-5 text-[#667085]' />
							</button>
						</div>
					</div>
				)}
				<input
					type='file'
					id='file-upload'
					className='hidden'
					ref={fileInputRef}
					onChange={handleFileChange}
					accept='image/png,image/jpeg'
				/>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='block mb-1 text-[85%] font-medium'>Deadline</label>
					<div className='relative'>
						<input
							type='text'
							required
							value={formData.date}
							onChange={(e) =>
								setFormData({ ...formData, date: e.target.value })
							}
							placeholder='Aug 26th 2024'
							className='w-full p-2 pr-8 border border-[#D0D5DD] rounded-lg outline-none text-[95%] font-light'
						/>
						<FaRegCalendar className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1A1919]' />
					</div>
				</div>
				<div>
					<label className='block mb-1 text-[85%] font-medium'>Time</label>
					<div className='relative'>
						<input
							type='text'
							required
							value={formData.time}
							onChange={(e) =>
								setFormData({ ...formData, time: e.target.value })
							}
							placeholder='2:00 pm'
							className='w-full p-2 pr-8 border border-[#D0D5DD] rounded-lg outline-none text-[95%] font-light'
						/>
						<IoTimeOutline className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1A1919]' />
					</div>
				</div>
			</div>

			<button
				type='submit'
				className='w-full bg-[#4F35F3] text-white py-2 rounded-lg hover:bg-[#3a26b8] transition-colors cursor-pointer'>
				{buttonText}
			</button>
		</form>
	);
};

export default TaskForm;
