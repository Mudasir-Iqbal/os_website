// OS Tree Data Structure - Adjusted for horizontal layout
const osTreeData = {
  name: "Operating System Architecture",
  description: "The complete structure and organization of an operating system.",
  children: [
    {
      name: "System Boot",
      description: "The process of starting up a computer and loading the operating system.",
      children: [
        {
          name: "BIOS/UEFI",
          description: "Basic Input/Output System or Unified Extensible Firmware Interface - firmware that initializes hardware during booting."
        },
        {
          name: "POST",
          description: "Power-On Self-Test - tests hardware components before booting."
        },
        {
          name: "Bootloader",
          description: "Program that loads the operating system kernel (e.g., GRUB, Windows Boot Manager)."
        },
        {
          name: "Kernel Loading",
          description: "Process of loading the OS kernel into memory."
        },
        {
          name: "Init/Systemd",
          description: "First process started by the kernel that initializes the system (PID 1)."
        }
      ]
    },
    {
      name: "Kernel & System Structure",
      description: "The core component of an OS that manages system resources.",
      children: [
        {
          name: "Monolithic Kernel",
          description: "Architecture where the entire OS runs in kernel space (e.g., Linux, traditional Unix)."
        },
        {
          name: "Microkernel",
          description: "Architecture where minimal functionality is in kernel space; services run in user space (e.g., MINIX)."
        },
        {
          name: "Hybrid Kernel",
          description: "Combines aspects of monolithic and microkernel designs (e.g., Windows NT, macOS)."
        },
        {
          name: "Exokernel",
          description: "Provides minimal hardware protection; library operating systems implement functionality."
        }
      ]
    },
    {
      name: "System Call Interface",
      description: "The interface that allows user programs to request services from the kernel.",
      children: [
        {
          name: "User Mode vs Kernel Mode",
          description: "Protection mechanism that separates user applications from critical system functions."
        },
        {
          name: "System Call Types",
          description: "Categories including process control, file management, device management, information maintenance, communication."
        },
        {
          name: "System Call Implementation",
          description: "How system calls are implemented (e.g., via interrupts, trap instructions)."
        }
      ]
    },
    {
      name: "Process Management",
      description: "Creating, scheduling, and terminating processes.",
      children: [
        {
          name: "Process Concept",
          description: "A program in execution with associated resources."
        },
        {
          name: "Process States",
          description: "States a process can be in (New, Ready, Running, Waiting, Terminated)."
        },
        {
          name: "Process Control Block (PCB)",
          description: "Data structure containing process information (state, PID, program counter, registers, etc.)."
        },
        {
          name: "Process Creation & Termination",
          description: "How processes are created (fork/exec) and terminated."
        },
        {
          name: "Context Switching",
          description: "Saving and restoring process state when switching between processes."
        }
      ]
    },
    {
      name: "Thread Management",
      description: "Managing lightweight processes that share resources.",
      children: [
        {
          name: "Thread Concept",
          description: "Lightweight unit of execution within a process."
        },
        {
          name: "User vs Kernel Threads",
          description: "Threads managed by user-level libraries vs. those managed by the kernel."
        },
        {
          name: "Threading Models",
          description: "Many-to-One, One-to-One, Many-to-Many thread mapping approaches."
        },
        {
          name: "Thread Libraries",
          description: "APIs for thread creation and management (POSIX threads, Java threads)."
        }
      ]
    },
    {
      name: "CPU Scheduling",
      description: "Determining which process runs on the CPU.",
      children: [
        {
          name: "Scheduling Criteria",
          description: "Metrics for evaluating scheduling algorithms (CPU utilization, throughput, turnaround time, waiting time, response time)."
        },
        {
          name: "Scheduling Algorithms",
          description: "Methods to select the next process to run.",
          children: [
            {
              name: "First-Come, First-Served (FCFS)",
              description: "Processes are executed in the order they arrive."
            },
            {
              name: "Shortest-Job-First (SJF)",
              description: "Process with the smallest execution time runs first."
            },
            {
              name: "Priority Scheduling",
              description: "Process with highest priority runs first."
            },
            {
              name: "Round Robin (RR)",
              description: "Each process gets a small unit of CPU time (time quantum), then is preempted."
            }
          ]
        }
      ]
    },
    {
      name: "Inter-Process Communication (IPC)",
      description: "Mechanisms for processes to exchange data and synchronize actions.",
      children: [
        {
          name: "Shared Memory",
          description: "Processes share a region of memory for communication."
        },
        {
          name: "Message Passing",
          description: "Processes exchange messages through the kernel."
        },
        {
          name: "Pipes",
          description: "Unidirectional communication channel."
        },
        {
          name: "Sockets",
          description: "Endpoint for sending/receiving data across a network."
        }
      ]
    },
    {
      name: "Deadlock Management",
      description: "Handling situations where processes are blocked indefinitely.",
      children: [
        {
          name: "Deadlock Conditions",
          description: "Four necessary conditions: mutual exclusion, hold and wait, no preemption, circular wait."
        },
        {
          name: "Resource Allocation Graph",
          description: "Graphical representation of resource allocation to detect deadlocks."
        },
        {
          name: "Deadlock Prevention",
          description: "Ensuring at least one deadlock condition cannot hold."
        },
        {
          name: "Deadlock Avoidance",
          description: "Making safe resource allocation decisions (e.g., Banker's Algorithm)."
        }
      ]
    },
    {
      name: "Memory Management",
      description: "Managing the computer's main memory (RAM).",
      children: [
        {
          name: "Address Binding",
          description: "Mapping program addresses to physical memory addresses."
        },
        {
          name: "Memory Allocation",
          description: "Methods to allocate memory to processes.",
          children: [
            {
              name: "Contiguous Allocation",
              description: "Each process gets a single continuous block of memory."
            },
            {
              name: "Paging",
              description: "Dividing memory into fixed-size pages and frames."
            },
            {
              name: "Segmentation",
              description: "Dividing memory into variable-sized segments based on logical units."
            }
          ]
        },
        {
          name: "Virtual Memory",
          description: "Using disk space to extend RAM.",
          children: [
            {
              name: "Demand Paging",
              description: "Loading pages into memory only when needed."
            },
            {
              name: "Page Replacement Algorithms",
              description: "Methods to select which page to remove from memory (FIFO, LRU, Optimal)."
            }
          ]
        }
      ]
    },
    {
      name: "Storage Management & File Systems",
      description: "Managing persistent storage and organizing data.",
      children: [
        {
          name: "Storage Structure",
          description: "Physical organization of storage devices.",
          children: [
            {
              name: "Hard Disk Drives (HDD)",
              description: "Magnetic storage with platters, tracks, and sectors."
            },
            {
              name: "Solid State Drives (SSD)",
              description: "Flash memory-based storage without moving parts."
            }
          ]
        },
        {
          name: "File System",
          description: "Methods to organize and store files.",
          children: [
            {
              name: "File Concepts",
              description: "Attributes, operations, types, and access methods."
            },
            {
              name: "Directory Structure",
              description: "Organization of files (single-level, two-level, tree, graph)."
            },
            {
              name: "File Allocation Methods",
              description: "How file blocks are allocated (contiguous, linked, indexed)."
            }
          ]
        }
      ]
    },
    {
      name: "I/O Management",
      description: "Managing input/output operations with peripheral devices.",
      children: [
        {
          name: "I/O Hardware",
          description: "Physical devices and controllers."
        },
        {
          name: "I/O Techniques",
          description: "Methods for performing I/O operations.",
          children: [
            {
              name: "Programmed I/O",
              description: "CPU executes instructions to transfer data."
            },
            {
              name: "Interrupt-Driven I/O",
              description: "Device signals CPU when ready for data transfer."
            },
            {
              name: "Direct Memory Access (DMA)",
              description: "Device controller transfers data directly to/from memory without CPU involvement."
            }
          ]
        }
      ]
    },
    {
      name: "Security and Protection",
      description: "Safeguarding system resources and user data.",
      children: [
        {
          name: "Authentication",
          description: "Verifying the identity of users (passwords, biometrics, tokens)."
        },
        {
          name: "Authorization",
          description: "Determining what resources a user can access."
        },
        {
          name: "Access Control",
          description: "Methods to restrict access to resources.",
          children: [
            {
              name: "Access Control Matrix",
              description: "Table showing which users can access which resources."
            },
            {
              name: "Access Control Lists (ACLs)",
              description: "List of permissions attached to an object."
            }
          ]
        }
      ]
    },
    {
      name: "System Shutdown",
      description: "The process of safely stopping the operating system.",
      children: [
        {
          name: "Process Termination",
          description: "Stopping user processes in an orderly manner."
        },
        {
          name: "Service Shutdown",
          description: "Stopping system services and daemons."
        },
        {
          name: "Filesystem Synchronization",
          description: "Writing cached data to disk (sync operation)."
        },
        {
          name: "Hardware Power Management",
          description: "Signaling hardware to power off or reboot."
        }
      ]
    }
  ]
};
