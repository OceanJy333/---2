/**
 * 通知更新脚本 - 增强版
 * 用于处理通知相关的交互和更新
 * 集成 Font Awesome 图标和 Tailwind CSS 样式
 */

document.addEventListener('DOMContentLoaded', function() {
    // 通知按钮点击事件
    const notificationButton = document.getElementById('notification-button');
    const notificationDropdown = document.getElementById('notification-dropdown');

    console.log('通知按钮元素存在:', !!notificationButton);
    console.log('通知下拉菜单元素存在:', !!notificationDropdown);

    // 确保移除任何可能存在的旧事件监听器
    if (notificationButton) {
        notificationButton.removeEventListener('click', handleNotificationClick);

        // 添加新的事件监听器
        notificationButton.addEventListener('click', handleNotificationClick);
    }

    // 通知按钮点击处理函数
    function handleNotificationClick(e) {
        console.log('通知按钮被点击');
        e.stopPropagation(); // 阻止事件冒泡

        if (notificationDropdown) {
            notificationDropdown.classList.toggle('show');
            console.log('通知下拉菜单显示状态:', notificationDropdown.classList.contains('show'));

            // 关闭其他菜单
            const userDropdownMenu = document.getElementById('user-dropdown-menu');
            const sidebarDropdownMenu = document.getElementById('sidebar-dropdown-menu');

            if (userDropdownMenu) {
                userDropdownMenu.classList.remove('show');
            }

            if (sidebarDropdownMenu) {
                sidebarDropdownMenu.classList.remove('show');
            }
        }
    }

    // 标记所有通知为已读
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });

            // 更新通知计数
            updateNotificationCount();
        });
    }

    // 查看全部通知链接
    const viewAllNotificationsLink = document.getElementById('view-all-notifications-link');
    if (viewAllNotificationsLink) {
        viewAllNotificationsLink.addEventListener('click', function() {
            // 关闭通知下拉菜单
            if (notificationDropdown) {
                notificationDropdown.classList.remove('show');
            }

            // 打开通知模态框
            const notificationsModal = document.getElementById('notifications-modal');
            if (notificationsModal) {
                notificationsModal.style.display = 'block';
            }
        });
    }

    // 关闭通知模态框
    const closeModalBtn = document.querySelector('.close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            const notificationsModal = document.getElementById('notifications-modal');
            if (notificationsModal) {
                notificationsModal.style.display = 'none';
            }
        });
    }

    // 通知模态框选项卡切换
    const modalTabs = document.querySelectorAll('.modal-tab');
    const notificationsList = document.querySelector('.notifications-list');
    const activitiesList = document.querySelector('.activities-list');

    if (modalTabs.length > 0) {
        modalTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有选项卡的active类
                modalTabs.forEach(t => t.classList.remove('active'));

                // 为当前选项卡添加active类
                this.classList.add('active');

                // 根据选项卡类型显示对应的列表
                const tabType = this.getAttribute('data-tab');

                if (tabType === 'activities' && activitiesList) {
                    notificationsList.style.display = 'none';
                    activitiesList.style.display = 'block';
                } else if (notificationsList) {
                    notificationsList.style.display = 'block';
                    activitiesList.style.display = 'none';

                    // 如果是未读通知选项卡，则只显示未读通知
                    if (tabType === 'unread') {
                        const allNotifications = document.querySelectorAll('.notification-item-full');
                        allNotifications.forEach(notification => {
                            if (notification.classList.contains('unread')) {
                                notification.style.display = 'flex';
                            } else {
                                notification.style.display = 'none';
                            }
                        });
                    } else {
                        // 显示所有通知
                        const allNotifications = document.querySelectorAll('.notification-item-full');
                        allNotifications.forEach(notification => {
                            notification.style.display = 'flex';
                        });
                    }
                }
            });
        });
    }

    // 更新通知计数的函数
    function updateNotificationCount() {
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        const notificationBadge = document.querySelector('.notification-badge');

        if (notificationBadge) {
            if (unreadNotifications.length > 0) {
                notificationBadge.textContent = unreadNotifications.length;
                notificationBadge.style.display = 'flex';
            } else {
                notificationBadge.style.display = 'none';
            }
        }
    }

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (notificationDropdown && notificationDropdown.classList.contains('show')) {
            if (!notificationDropdown.contains(e.target) && e.target !== notificationButton) {
                notificationDropdown.classList.remove('show');
            }
        }
    });

    // 初始化通知计数
    updateNotificationCount();
});
