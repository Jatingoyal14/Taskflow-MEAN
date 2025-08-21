/**
 * MEAN Stack Task Management Application
 * 
 * This application demonstrates key MEAN stack concepts:
 * - MongoDB: Simulated with localStorage for data persistence
 * - Express.js: Simulated with JavaScript functions for API operations
 * - Angular: Component-based architecture with modern JavaScript
 * - Node.js: Modern ES6+ features and async operations
 */

// =================
// DATABASE SIMULATION (MongoDB)
// =================

/**
 * TaskDB - Simulates MongoDB operations using localStorage
 * This represents how you would interact with a MongoDB database
 */
class TaskDB {
    constructor() {
        this.storageKey = 'meanstack_tasks';
        this.initializeDatabase();
    }

    // Initialize database with sample data (like seeding MongoDB)
    initializeDatabase() {
        if (!localStorage.getItem(this.storageKey)) {
            const sampleTasks = [
                {
                    id: 1,
                    title: "Complete MEAN Stack Project",
                    description: "Build a full-stack task management application using MongoDB, Express.js, Angular, and Node.js",
                    priority: "High",
                    dueDate: "2025-09-15",
                    status: "Pending",
                    createdAt: "2025-08-20T10:00:00Z",
                    updatedAt: "2025-08-20T10:00:00Z"
                },
                {
                    id: 2,
                    title: "Study Angular Framework",
                    description: "Learn Angular concepts including components, services, routing, and data binding",
                    priority: "Medium",
                    dueDate: "2025-08-30",
                    status: "Completed",
                    createdAt: "2025-08-18T14:30:00Z",
                    updatedAt: "2025-08-21T09:15:00Z"
                },
                {
                    id: 3,
                    title: "Setup Development Environment",
                    description: "Install Node.js, MongoDB, Angular CLI, and VS Code with necessary extensions",
                    priority: "High",
                    dueDate: "2025-08-22",
                    status: "Completed",
                    createdAt: "2025-08-17T11:20:00Z",
                    updatedAt: "2025-08-19T16:45:00Z"
                },
                {
                    id: 4,
                    title: "Design Database Schema",
                    description: "Plan the MongoDB collection structure for tasks, users, and categories",
                    priority: "Medium",
                    dueDate: "2025-09-01",
                    status: "Pending",
                    createdAt: "2025-08-19T13:10:00Z",
                    updatedAt: "2025-08-19T13:10:00Z"
                },
                {
                    id: 5,
                    title: "Create REST API Endpoints",
                    description: "Develop Express.js routes for CRUD operations on tasks",
                    priority: "High",
                    dueDate: "2025-09-05",
                    status: "Pending",
                    createdAt: "2025-08-20T08:45:00Z",
                    updatedAt: "2025-08-20T08:45:00Z"
                }
            ];
            localStorage.setItem(this.storageKey, JSON.stringify(sampleTasks));
        }
    }

    // GET all tasks (like MongoDB find())
    getAllTasks() {
        const tasks = localStorage.getItem(this.storageKey);
        return tasks ? JSON.parse(tasks) : [];
    }

    // GET task by ID (like MongoDB findById())
    getTaskById(id) {
        const tasks = this.getAllTasks();
        return tasks.find(task => task.id === parseInt(id));
    }

    // POST new task (like MongoDB insertOne())
    createTask(taskData) {
        const tasks = this.getAllTasks();
        const newTask = {
            id: this.generateId(),
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        return newTask;
    }

    // PUT update task (like MongoDB updateOne())
    updateTask(id, updateData) {
        const tasks = this.getAllTasks();
        const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
            return tasks[taskIndex];
        }
        return null;
    }

    // DELETE task (like MongoDB deleteOne())
    deleteTask(id) {
        const tasks = this.getAllTasks();
        const filteredTasks = tasks.filter(task => task.id !== parseInt(id));
        localStorage.setItem(this.storageKey, JSON.stringify(filteredTasks));
        return true;
    }

    // Generate unique ID (in real MongoDB, this would be ObjectId)
    generateId() {
        const tasks = this.getAllTasks();
        return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    }
}

// =================
// API SERVICE (Express.js Simulation)
// =================

/**
 * TaskAPI - Simulates Express.js REST API endpoints
 * In a real MEAN app, these would be actual HTTP requests to your Express server
 */
class TaskAPI {
    constructor() {
        this.db = new TaskDB();
    }

    // Simulate async API calls with delays (like real network requests)
    async delay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // GET /api/tasks - Get all tasks
    async getTasks() {
        await this.delay(50);
        return {
            success: true,
            data: this.db.getAllTasks(),
            message: 'Tasks retrieved successfully'
        };
    }

    // GET /api/tasks/:id - Get single task
    async getTask(id) {
        await this.delay(50);
        const task = this.db.getTaskById(id);
        if (task) {
            return {
                success: true,
                data: task,
                message: 'Task retrieved successfully'
            };
        }
        return {
            success: false,
            message: 'Task not found'
        };
    }

    // POST /api/tasks - Create new task
    async createTask(taskData) {
        await this.delay(100);
        try {
            const newTask = this.db.createTask(taskData);
            return {
                success: true,
                data: newTask,
                message: 'Task created successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to create task'
            };
        }
    }

    // PUT /api/tasks/:id - Update task
    async updateTask(id, updateData) {
        await this.delay(100);
        try {
            const updatedTask = this.db.updateTask(id, updateData);
            if (updatedTask) {
                return {
                    success: true,
                    data: updatedTask,
                    message: 'Task updated successfully'
                };
            }
            return {
                success: false,
                message: 'Task not found'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to update task'
            };
        }
    }

    // DELETE /api/tasks/:id - Delete task
    async deleteTask(id) {
        await this.delay(100);
        try {
            this.db.deleteTask(id);
            return {
                success: true,
                message: 'Task deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to delete task'
            };
        }
    }
}

// =================
// ANGULAR-INSPIRED COMPONENTS
// =================

/**
 * AppComponent - Main application component
 * This simulates Angular's component-based architecture
 */
class AppComponent {
    constructor() {
        this.api = new TaskAPI();
        this.currentPage = 'dashboard';
        this.tasks = [];
        this.filteredTasks = [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.deleteTaskId = null;
        
        this.init();
    }

    // Initialize the application (like Angular's ngOnInit)
    async init() {
        await this.loadTasks();
        this.setupEventListeners();
        this.renderDashboard();
        this.showPage('dashboard');
        this.updateNavigation();
    }

    // Setup all event listeners (like Angular event binding)
    setupEventListeners() {
        // Navigation - specifically target navbar links
        document.querySelectorAll('.nav-link[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateTo(page);
            });
        });

        // Page action buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page="add-task"]') && !e.target.matches('.nav-link')) {
                e.preventDefault();
                this.navigateTo('add-task');
            }
        });

        // Task form submission
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTaskSubmit();
            });
        }

        // Edit task form submission
        const editTaskForm = document.getElementById('edit-task-form');
        if (editTaskForm) {
            editTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEditTaskSubmit();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });

        // Cancel buttons
        const cancelBtn = document.getElementById('cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.navigateTo('tasks');
            });
        }

        const editCancelBtn = document.getElementById('edit-cancel-btn');
        if (editCancelBtn) {
            editCancelBtn.addEventListener('click', () => {
                this.navigateTo('tasks');
            });
        }

        // Modal handlers
        const cancelDelete = document.getElementById('cancel-delete');
        if (cancelDelete) {
            cancelDelete.addEventListener('click', () => {
                this.hideDeleteModal();
            });
        }

        const confirmDelete = document.getElementById('confirm-delete');
        if (confirmDelete) {
            confirmDelete.addEventListener('click', () => {
                this.confirmDelete();
            });
        }

        // Close modal on overlay click
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.hideDeleteModal();
            });
        }
    }

    // Navigation system (like Angular Router)
    navigateTo(page) {
        this.currentPage = page;
        this.showPage(page);
        this.updateNavigation();

        // Handle page-specific logic
        if (page === 'tasks') {
            this.renderTasks();
        } else if (page === 'add-task') {
            this.resetTaskForm();
        } else if (page === 'dashboard') {
            this.renderDashboard();
        }
    }

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Load tasks from API (like Angular service call)
    async loadTasks() {
        try {
            const response = await this.api.getTasks();
            if (response.success) {
                this.tasks = response.data;
                this.applyCurrentFilter();
                return true;
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.showToast('Failed to load tasks', 'error');
        }
        return false;
    }

    // Dashboard rendering (like Angular template rendering)
    renderDashboard() {
        const stats = this.calculateStats();
        
        const totalEl = document.getElementById('total-tasks');
        const pendingEl = document.getElementById('pending-tasks');
        const completedEl = document.getElementById('completed-tasks');
        const highPriorityEl = document.getElementById('high-priority-tasks');
        
        if (totalEl) totalEl.textContent = stats.total;
        if (pendingEl) pendingEl.textContent = stats.pending;
        if (completedEl) completedEl.textContent = stats.completed;
        if (highPriorityEl) highPriorityEl.textContent = stats.highPriority;

        // Render recent tasks
        const recentTasks = this.tasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
        
        const container = document.getElementById('recent-tasks-container');
        if (container) {
            container.innerHTML = recentTasks.map(task => this.renderTaskCard(task)).join('');
            // Attach event listeners to recent task cards
            this.attachTaskEventListeners(container);
        }
    }

    calculateStats() {
        return {
            total: this.tasks.length,
            pending: this.tasks.filter(t => t.status === 'Pending').length,
            completed: this.tasks.filter(t => t.status === 'Completed').length,
            highPriority: this.tasks.filter(t => t.priority === 'High').length
        };
    }

    // Task rendering (like Angular *ngFor)
    renderTasks() {
        const container = document.getElementById('tasks-container');
        const emptyState = document.getElementById('empty-state');

        if (!container || !emptyState) return;

        if (this.filteredTasks.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            container.innerHTML = this.filteredTasks.map(task => this.renderTaskCard(task)).join('');
            this.attachTaskEventListeners(container);
        }
    }

    renderTaskCard(task) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && task.status === 'Pending';
        
        return `
            <div class="task-card ${task.status.toLowerCase()}" data-task-id="${task.id}">
                <div class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <p class="task-description">${this.escapeHtml(task.description)}</p>
                <div class="task-meta">
                    <div class="task-due-date ${isOverdue ? 'overdue' : ''}">
                        📅 Due: ${this.formatDate(task.dueDate)}
                    </div>
                    <div class="task-created">
                        Created: ${this.formatDate(task.createdAt)}
                    </div>
                </div>
                <div class="task-actions">
                    <div class="task-status">
                        <button class="status-toggle" data-task-id="${task.id}" data-action="toggle">
                            ${task.status === 'Completed' ? '✅' : '⭕'}
                        </button>
                        <span>${task.status}</span>
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn edit" data-task-id="${task.id}" data-action="edit" title="Edit Task">
                            ✏️
                        </button>
                        <button class="action-btn delete" data-task-id="${task.id}" data-action="delete" title="Delete Task">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Attach event listeners to task cards (like Angular event binding)
    attachTaskEventListeners(container = document) {
        // Remove existing listeners to prevent duplicates
        const actionBtns = container.querySelectorAll('[data-action]');
        
        actionBtns.forEach(btn => {
            // Clone node to remove existing event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add new event listener
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const taskId = e.target.getAttribute('data-task-id');
                const action = e.target.getAttribute('data-action');
                
                switch (action) {
                    case 'toggle':
                        this.toggleTaskStatus(taskId);
                        break;
                    case 'edit':
                        this.editTask(taskId);
                        break;
                    case 'delete':
                        this.showDeleteModal(taskId);
                        break;
                }
            });
        });
    }

    // Task CRUD operations
    async handleTaskSubmit() {
        const formData = this.getTaskFormData();
        
        if (!this.validateTaskForm(formData)) {
            return;
        }

        try {
            const response = await this.api.createTask(formData);
            if (response.success) {
                this.showToast('Task created successfully!', 'success');
                await this.loadTasks();
                this.renderDashboard();
                this.navigateTo('tasks');
            } else {
                this.showToast(response.message, 'error');
            }
        } catch (error) {
            this.showToast('Failed to create task', 'error');
        }
    }

    async editTask(taskId) {
        const task = this.tasks.find(t => t.id === parseInt(taskId));
        
        if (task) {
            this.editingTaskId = taskId;
            this.populateEditForm(task);
            this.navigateTo('edit-task');
        }
    }

    populateEditForm(task) {
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-title').value = task.title;
        document.getElementById('edit-task-description').value = task.description;
        document.getElementById('edit-task-priority').value = task.priority;
        document.getElementById('edit-task-due-date').value = task.dueDate;
        document.getElementById('edit-task-status').value = task.status;
    }

    async handleEditTaskSubmit() {
        const taskId = document.getElementById('edit-task-id').value;
        const formData = this.getEditTaskFormData();
        
        if (!this.validateEditTaskForm(formData)) {
            return;
        }

        try {
            const response = await this.api.updateTask(taskId, formData);
            if (response.success) {
                this.showToast('Task updated successfully!', 'success');
                await this.loadTasks();
                this.renderDashboard();
                this.navigateTo('tasks');
            } else {
                this.showToast(response.message, 'error');
            }
        } catch (error) {
            this.showToast('Failed to update task', 'error');
        }
    }

    async toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === parseInt(taskId));
        if (!task) return;

        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        
        try {
            const response = await this.api.updateTask(taskId, { status: newStatus });
            if (response.success) {
                this.showToast(`Task marked as ${newStatus.toLowerCase()}!`, 'success');
                await this.loadTasks();
                
                // Re-render current page
                if (this.currentPage === 'tasks') {
                    this.renderTasks();
                } else if (this.currentPage === 'dashboard') {
                    this.renderDashboard();
                }
            } else {
                this.showToast(response.message, 'error');
            }
        } catch (error) {
            this.showToast('Failed to update task status', 'error');
        }
    }

    showDeleteModal(taskId) {
        this.deleteTaskId = taskId;
        const modal = document.getElementById('delete-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideDeleteModal() {
        this.deleteTaskId = null;
        const modal = document.getElementById('delete-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    async confirmDelete() {
        if (!this.deleteTaskId) return;

        try {
            const response = await this.api.deleteTask(this.deleteTaskId);
            if (response.success) {
                this.showToast('Task deleted successfully!', 'success');
                await this.loadTasks();
                
                // Re-render current page
                if (this.currentPage === 'tasks') {
                    this.renderTasks();
                } else if (this.currentPage === 'dashboard') {
                    this.renderDashboard();
                }
            } else {
                this.showToast(response.message, 'error');
            }
        } catch (error) {
            this.showToast('Failed to delete task', 'error');
        } finally {
            this.hideDeleteModal();
        }
    }

    // Search and filtering
    handleSearch(query) {
        this.searchTasks(query);
    }

    searchTasks(query) {
        if (!query.trim()) {
            this.applyCurrentFilter();
            return;
        }

        const filtered = this.getFilteredTasksByStatus().filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase())
        );

        this.filteredTasks = filtered;
        this.renderTasks();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        this.applyCurrentFilter();
    }

    applyCurrentFilter() {
        this.filteredTasks = this.getFilteredTasksByStatus();
        if (this.currentPage === 'tasks') {
            this.renderTasks();
        }
    }

    getFilteredTasksByStatus() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => task.status === 'Pending');
            case 'completed':
                return this.tasks.filter(task => task.status === 'Completed');
            default:
                return [...this.tasks];
        }
    }

    // Form handling and validation
    getTaskFormData() {
        return {
            title: document.getElementById('task-title').value.trim(),
            description: document.getElementById('task-description').value.trim(),
            priority: document.getElementById('task-priority').value,
            dueDate: document.getElementById('task-due-date').value,
            status: 'Pending'
        };
    }

    getEditTaskFormData() {
        return {
            title: document.getElementById('edit-task-title').value.trim(),
            description: document.getElementById('edit-task-description').value.trim(),
            priority: document.getElementById('edit-task-priority').value,
            dueDate: document.getElementById('edit-task-due-date').value,
            status: document.getElementById('edit-task-status').value
        };
    }

    validateTaskForm(data) {
        let isValid = true;
        
        // Clear previous errors
        const titleError = document.getElementById('title-error');
        if (titleError) {
            titleError.classList.remove('visible');
        }

        if (!data.title) {
            if (titleError) {
                titleError.textContent = 'Task title is required';
                titleError.classList.add('visible');
            }
            isValid = false;
        }

        return isValid;
    }

    validateEditTaskForm(data) {
        let isValid = true;
        
        // Clear previous errors
        const editTitleError = document.getElementById('edit-title-error');
        if (editTitleError) {
            editTitleError.classList.remove('visible');
        }

        if (!data.title) {
            if (editTitleError) {
                editTitleError.textContent = 'Task title is required';
                editTitleError.classList.add('visible');
            }
            isValid = false;
        }

        return isValid;
    }

    resetTaskForm() {
        const form = document.getElementById('task-form');
        if (form) {
            form.reset();
        }
        
        document.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('visible');
        });
    }

    // UI utilities
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : '❌';
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// =================
// APPLICATION INITIALIZATION
// =================

/**
 * Initialize the application when DOM is loaded
 * This is like the main() function in Node.js applications
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the main application component
    window.app = new AppComponent();
    
    console.log(`
    🎉 MEAN Stack Task Manager Loaded Successfully!
    
    📚 Technologies Demonstrated:
    ✅ MongoDB - Data persistence with localStorage
    ✅ Express.js - RESTful API structure
    ✅ Angular - Component-based architecture
    ✅ Node.js - Modern JavaScript features
    
    🔧 Features Implemented:
    ✅ CRUD Operations (Create, Read, Update, Delete)
    ✅ Task Management (Add, Edit, Delete, Toggle Status)
    ✅ Search and Filtering
    ✅ Form Validation
    ✅ Responsive Design
    ✅ User Feedback (Toasts, Loading States)
    ✅ Modal Dialogs
    ✅ Dashboard with Statistics
    
    This application is perfect for demonstrating MEAN stack knowledge on your resume!
    `);
});