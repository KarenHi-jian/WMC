class FriendRepository {
  getAllFriends() {
    throw new Error("Método no implementado");
  }
}

// Implementación para obtener amigos desde datos estáticos (simulando un archivo plano)
class StaticFriendRepository extends FriendRepository {
  getAllFriends() {
    return [
      {
        lastName: "Doe",
        firstName: "John",
        dateOfBirth: "1982/10/08",
        email: "john.doe@example.com"
      },
      {
        lastName: "Ann",
        firstName: "Mary",
        dateOfBirth: "1975/09/11",
        email: "mary.ann@example.com"
      }
    ];
  }
}

// Interfaz para enviar mensajes
class MessageSender {
  sendMessage(to, subject, content) {
    throw new Error("Método no implementado");
  }
}

// Implementación para "enviar" mensajes mostrándolos en pantalla
class DisplayMessageSender extends MessageSender {
  constructor(outputElementId) {
    super();
    this.outputElementId = outputElementId;
  }

  sendMessage(to, subject, content) {
    const output = document.getElementById(this.outputElementId);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const recipientElement = document.createElement('p');
    recipientElement.className = 'recipient';
    recipientElement.textContent = 'Para: ' + to;
    
    const subjectElement = document.createElement('p');
    subjectElement.className = 'subject';
    subjectElement.textContent = 'Asunto: ' + subject;
    
    const contentElement = document.createElement('div');
    contentElement.className = 'content';
    content.split('\n').forEach(line => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      contentElement.appendChild(paragraph);
    });
    
    const separator = document.createElement('hr');
    
    messageDiv.appendChild(recipientElement);
    messageDiv.appendChild(subjectElement);
    messageDiv.appendChild(contentElement);
    messageDiv.appendChild(separator);
    
    output.appendChild(messageDiv);
  }
}

// Servicio principal que maneja los cumpleaños
class BirthdayService {
  constructor(friendRepository, messageSender) {
    this.friendRepository = friendRepository;
    this.messageSender = messageSender;
  }

  // Función auxiliar para verificar si hoy es cumpleaños
  isBirthday(dateOfBirth) {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    
    // Manejo especial para los nacidos el 29 de febrero
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };
    
    const month = dob.getMonth();
    let day = dob.getDate();
    
    // Si nació el 29 de febrero y no estamos en año bisiesto, tratar como 28 de febrero
    if (month === 1 && day === 29 && !isLeapYear(today.getFullYear())) {
      day = 28;
    }
    
    return today.getMonth() === month && today.getDate() === day;
  }

  // Enviar felicitaciones de cumpleaños
  sendBirthdayGreetings() {
    const friends = this.friendRepository.getAllFriends();
    const todaysBirthdays = friends.filter(friend => this.isBirthday(friend.dateOfBirth));
    
    // Si no hay cumpleaños hoy, mostrar un mensaje
    if (todaysBirthdays.length === 0) {
      this.messageSender.sendMessage(
        "Sistema",
        "Sin cumpleaños hoy",
        "No hay amigos que cumplan años hoy."
      );
      return;
    }
    
    // Enviar felicitaciones a cada persona que cumple años
    todaysBirthdays.forEach(friend => {
      this.messageSender.sendMessage(
        friend.email,
        "Happy birthday!",
        `Happy birthday, dear ${friend.firstName}!`
      );
    });
    
    // Enviar recordatorios a todos los demás amigos
    if (todaysBirthdays.length > 0) {
      const nonBirthdayFriends = friends.filter(friend => !todaysBirthdays.includes(friend));
      
      nonBirthdayFriends.forEach(friend => {
        // Formatear la lista de nombres completos de quienes cumplen años
        const birthdayNames = todaysBirthdays.map(
          bFriend => `${bFriend.firstName} ${bFriend.lastName}`
        );
        
        let namesList = "";
        if (birthdayNames.length === 1) {
          namesList = birthdayNames[0];
        } else if (birthdayNames.length === 2) {
          namesList = `${birthdayNames[0]} and ${birthdayNames[1]}`;
        } else {
          const lastPerson = birthdayNames.pop();
          namesList = `${birthdayNames.join(', ')} and ${lastPerson}`;
        }
        
        this.messageSender.sendMessage(
          friend.email,
          "Birthday Reminder",
          `Dear ${friend.firstName},\n\nToday is ${namesList}'s ${birthdayNames.length > 1 ? 'birthdays' : 'birthday'}.\nDon't forget to send ${birthdayNames.length > 1 ? 'them each' : 'them'} a message!`
        );
      });
    }
  }
}

// Cuando se carga la página, iniciar el servicio de cumpleaños
document.addEventListener('DOMContentLoaded', function() {
  // Crear instancias de las dependencias
  const friendRepo = new StaticFriendRepository();
  const messageSender = new DisplayMessageSender('output');
  
  // Crear e iniciar el servicio de cumpleaños
  const birthdayService = new BirthdayService(friendRepo, messageSender);
  birthdayService.sendBirthdayGreetings();
  
  // Añadir un botón para cambiar la fecha (para probar)
  const dateControl = document.getElementById('dateControl');
  if (dateControl) {
    const dateButton = document.createElement('button');
    dateButton.textContent = 'Probar con otra fecha';
    dateButton.onclick = function() {
      const newDate = prompt('Ingresa una fecha en formato YYYY/MM/DD para probar:', '1982/10/08');
      if (newDate) {
        const parts = newDate.split('/');
        if (parts.length === 3) {
          const testDate = new Date();
          testDate.setFullYear(parseInt(parts[0]));
          testDate.setMonth(parseInt(parts[1]) - 1);
          testDate.setDate(parseInt(parts[2]));
          
          // Sobrescribir la función Date para propósitos de prueba
          const originalDate = Date;
          window.Date = function() {
            if (arguments.length === 0) {
              return testDate;
            }
            return new originalDate(...arguments);
          };
          window.Date.prototype = originalDate.prototype;
          
          // Limpiar el output y volver a ejecutar
          document.getElementById('output').innerHTML = '';
          birthdayService.sendBirthdayGreetings();
          
          // Restaurar la función Date original
          window.Date = originalDate;
        }
      }
    };
    dateControl.appendChild(dateButton);
  }
});
