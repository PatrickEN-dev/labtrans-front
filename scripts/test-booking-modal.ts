#!/usr/bin/env node
/**
 * Script para testar a criação de booking através do modal
 * Simula os dados que seriam enviados pelo frontend
 */

const API_BASE_URL = "http://localhost:8000/api";

interface BookingTestData {
  room?: string;
  manager?: string;
  start_date: string;
  end_date: string;
  name: string;
  description?: string;
  purpose: string;
  coffee_option: boolean;
  coffee_quantity?: number;
  coffee_description?: string;
}

async function testBookingCreation() {
  console.log("🧪 TESTE DO MODAL DE BOOKING");
  console.log("=".repeat(50));

  try {
    // 1. Obter dados padrão (como o modal faz)
    console.log("\n📋 1. Obtendo dados padrão...");

    const [locationResponse, managerResponse, roomResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/locations/get-or-create-default/`, { method: "POST" }),
      fetch(`${API_BASE_URL}/managers/get-or-create-default/`, { method: "POST" }),
      fetch(`${API_BASE_URL}/rooms/get-or-create-default/`, { method: "POST" }),
    ]);

    const locationData = await locationResponse.json();
    const managerData = await managerResponse.json();
    const roomData = await roomResponse.json();

    console.log("✅ Location:", locationData.location.name);
    console.log("✅ Manager:", managerData.manager.name);
    console.log("✅ Room:", roomData.room.name);

    // 2. Criar booking (como o modal fez após os ajustes)
    console.log("\n📅 2. Criando booking...");

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);

    const endTime = new Date(tomorrow);
    endTime.setHours(15, 0, 0, 0);

    const bookingData: BookingTestData = {
      room: roomData.room.id,
      manager: managerData.manager.id,
      start_date: tomorrow.toISOString(),
      end_date: endTime.toISOString(),
      name: "Reunião de Planejamento Q4",
      description: "Discussão dos objetivos e metas para o próximo trimestre",
      purpose: "Reunião de teste via modal",
      coffee_option: true,
      coffee_quantity: 5,
      coffee_description: "Café e biscoitos para reunião",
    };

    console.log("Dados do booking:", JSON.stringify(bookingData, null, 2));

    const bookingResponse = await fetch(`${API_BASE_URL}/bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!bookingResponse.ok) {
      const errorText = await bookingResponse.text();
      throw new Error(`Erro ${bookingResponse.status}: ${errorText}`);
    }

    const booking = await bookingResponse.json();
    console.log("✅ Booking criado:", booking.id.substring(0, 8) + "...");

    // 3. Verificar o booking criado
    console.log("\n🔍 3. Verificando booking...");
    const verifyResponse = await fetch(`${API_BASE_URL}/bookings/${booking.id}/`);
    const verifyData = await verifyResponse.json();

    console.log("📋 Detalhes do booking:");
    console.log(`   - ID: ${verifyData.id.substring(0, 8)}...`);
    console.log(`   - Status: ${verifyData.status}`);
    console.log(`   - Purpose: ${verifyData.purpose}`);
    if (verifyData.room_name) {
      console.log(`   - Room: ${verifyData.room_name}`);
    }
    if (verifyData.manager_name) {
      console.log(`   - Manager: ${verifyData.manager_name}`);
    }

    console.log("\n🎉 TESTE CONCLUÍDO COM SUCESSO!");
    console.log("✅ Modal está pronto para criar bookings!");

    return true;
  } catch (error) {
    console.error("\n❌ ERRO NO TESTE:", error);
    return false;
  }
}

async function main() {
  const success = await testBookingCreation();
  process.exit(success ? 0 : 1);
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  main();
}

export { testBookingCreation };
